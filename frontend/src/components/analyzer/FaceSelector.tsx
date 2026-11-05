import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FaceResult } from "@/types/api";

interface FaceSelectorProps {
  faces: FaceResult[];
  selectedFaceId: number;
  onSelectFace: (id: number) => void;
}

export function FaceSelector({ faces, selectedFaceId, onSelectFace }: FaceSelectorProps) {
  if (faces.length <= 1) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto pb-1" aria-label="Detected faces">
      <Tabs value={String(selectedFaceId)} onValueChange={(val) => onSelectFace(Number(val))}>
        <TabsList className="h-auto p-1 bg-muted/80 flex flex-wrap gap-1">
          {faces.map((face, index) => (
            <TabsTrigger
              key={face.id}
              value={String(face.id)}
              className="px-3 py-1.5 text-xs font-medium"
            >
              Face {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
