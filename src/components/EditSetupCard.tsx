"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateSetup } from "@/app/actions/updateSetup";
import { UploadButton } from "@uploadthing/react";

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

  async function handleImageUpload(res: any) {
    if (res && res[0]?.url) {
      setImageUrl(res[0].url);
      setSaving(true);
      await updateSetup(setup.id, { description, imageUrl: res[0].url });
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  }

  return (
    <Card className="w-full min-h-[60vh] flex flex-col shadow-lg maps__card">
      <CardHeader>
        <CardTitle className="text-2xl mb-2 maps__title">
          {setup.side} Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col md:flex-row gap-8 h-full">
        {/* Description section */}
        <section className="md:w-1/2 w-full flex flex-col flex-1 h-full maps__description">
          <label className="block text-lg font-semibold mb-2">
            Description
          </label>
          <div className="flex-1 flex flex-col">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the default setup..."
              className="resize-none h-full min-h-[300px] max-h-[calc(60vh-80px)] flex-1 overflow-y-auto"
              rows={16}
            />
            <div className="mt-4">
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save"}
              </Button>
              {success && <span className="text-green-600 ml-2">Saved!</span>}
            </div>
          </div>
        </section>
        {/* Image and upload section */}
        <section className="md:w-1/2 w-full flex flex-col gap-6 items-center justify-start maps__image">
          <div className="w-full">
            <label className="block text-lg font-semibold mb-2">Image</label>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${setup.side} setup`}
                className="w-full rounded border mb-4 max-h-80"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded mb-4">
                No image uploaded
              </div>
            )}
            <UploadButton
              endpoint="setupImage"
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error) =>
                alert(`Upload failed: ${error.message}`)
              }
              className="cursor-pointer"
            />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
