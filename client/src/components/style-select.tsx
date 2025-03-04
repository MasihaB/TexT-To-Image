import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STYLES = [
  { value: "default", label: "Default" },
  { value: "digital art", label: "Digital Art" },
  { value: "oil painting", label: "Oil Painting" },
  { value: "watercolor", label: "Watercolor" },
  { value: "anime", label: "Anime" },
  { value: "photorealistic", label: "Photorealistic" },
];

interface StyleSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function StyleSelect({ value, onChange, disabled }: StyleSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger 
        className="bg-background/50 border-border/50 h-[52px] text-lg"
      >
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {STYLES.map((style) => (
          <SelectItem 
            key={style.value} 
            value={style.value}
            className="text-base py-3"
          >
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}