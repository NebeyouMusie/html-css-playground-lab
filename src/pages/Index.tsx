import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 border-b">
        <h1 className="text-4xl font-bold text-center font-poppins">HTML/CSS Playground</h1>
        <p className="text-center text-muted-foreground mt-2">Experiment with HTML and CSS in real-time!</p>
      </header>

      <main className="flex-1 p-4">
        <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
          <ResizablePanel defaultSize={33}>
            <div className="h-full p-4">
              <h2 className="font-semibold mb-2">HTML</h2>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm bg-muted rounded-md"
                placeholder="Enter your HTML here..."
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={33}>
            <div className="h-full p-4">
              <h2 className="font-semibold mb-2">CSS</h2>
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm bg-muted rounded-md"
                placeholder="Enter your CSS here..."
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={33}>
            <div className="h-full p-4">
              <h2 className="font-semibold mb-2">Preview</h2>
              <div className="w-full h-[calc(100%-2rem)] bg-white rounded-md border p-4">
                <iframe
                  srcDoc={`
                    <html>
                      <head>
                        <style>${cssCode}</style>
                      </head>
                      <body>${htmlCode}</body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                  title="preview"
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setHtmlCode('');
              setCssCode('');
            }}
          >
            Clear All
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;