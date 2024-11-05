import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Index = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');

  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Add HTML file
    zip.file("index.html", `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlCode}
</body>
</html>`);
    
    // Add CSS file
    zip.file("style.css", cssCode);
    
    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "code.zip");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center font-poppins">HTML/CSS Playground</h1>
            <p className="text-center sm:text-left text-muted-foreground mt-2">Experiment with HTML and CSS in real-time!</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[500px] rounded-lg border"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
          }}
        >
          <ResizablePanel 
            defaultSize={33} 
            className="flex flex-col"
            minSize={30}
          >
            <div className="h-full p-2 sm:p-4">
              <h2 className="font-semibold mb-2">HTML</h2>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm bg-muted rounded-md"
                placeholder="Enter your HTML here..."
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={33} 
            className="flex flex-col"
            minSize={30}
          >
            <div className="h-full p-2 sm:p-4">
              <h2 className="font-semibold mb-2">CSS</h2>
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm bg-muted rounded-md"
                placeholder="Enter your CSS here..."
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={33} 
            className="flex flex-col"
            minSize={30}
          >
            <div className="h-full p-2 sm:p-4">
              <h2 className="font-semibold mb-2">Preview</h2>
              <div className="w-full h-[calc(100%-2rem)] bg-white dark:bg-zinc-900 rounded-md border p-2 sm:p-4">
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
          <Button
            variant="outline"
            onClick={handleDownload}
          >
            Download Code as .zip
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;