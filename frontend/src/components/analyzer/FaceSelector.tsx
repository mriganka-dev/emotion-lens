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
        <TabsList className="h-auto p-1 bg-black/80 border border-white/15 rounded-lg flex flex-wrap gap-1.5 backdrop-blur-md">
          {faces.map((face, index) => (
            <TabsTrigger
              key={face.id}
              value={String(face.id)}
              className="min-h-[40px] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70 data-[state=active]:bg-[#4c97ff]/20 data-[state=active]:text-[#8dd8ff] data-[state=active]:border data-[state=active]:border-[#4c97ff]/50 rounded transition-colors"
            >
              Face {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
