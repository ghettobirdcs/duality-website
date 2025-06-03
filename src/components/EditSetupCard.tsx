"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateSetup } from "@/app/actions/updateSetup";

export default function EditSetupCard({ setup }: { setup: any }) {
  const [description, setDescription] = useState(setup.description);
  const [imageUrl, setImageUrl] = useState(setup.imageUrl);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setSaving(true);
    await updateSetup(setup.id, { description, imageUrl });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{setup.side} Setup</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <label className="font-semibold">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the default setup..."
          rows={4}
        />
        <label className="font-semibold">Image URL</label>
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${setup.side} setup`}
            className="w-full rounded border mt-2"
          />
        )}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        {success && <span className="text-green-600">Saved!</span>}
      </CardContent>
    </Card>
  );
}
