import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StyleSelect } from "./style-select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImageGenerator() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      prompt: "",
      style: "default"
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { prompt: string; style: string }) => {
      const res = await apiRequest("POST", "/api/generate", data);
      return res.json();
    },
    onSuccess: (data) => {
      setGeneratedImage(data.imageUrl);
      toast({
        title: "✨ Success!",
        description: "Your image has been generated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate image. Please try again.",
      });
    }
  });

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "📥 Downloaded!",
        description: "Image has been saved to your device.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download image. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Describe the image you want to create..."
                    className="bg-background/50 border-border/50 text-lg py-6"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StyleSelect 
                    value={field.value} 
                    onChange={field.onChange} 
                    disabled={isPending} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="h-5 w-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </form>
      </Form>

      <AnimatePresence mode="wait">
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden bg-card/30 border border-border/50 p-4"
          >
            <motion.img
              src={generatedImage}
              alt="Generated image"
              className="w-full h-auto rounded-lg"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            />
            <Button
              onClick={handleDownload}
              className="absolute bottom-6 right-6 shadow-lg"
              variant="secondary"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}