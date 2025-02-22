import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { jsPDF } from "jspdf";

const CardEditor = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawingTool, setDrawingTool] = useState("pencil");
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
 
  const [shapeColor, setShapeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundColor: "white",
      selection: true,
      preserveObjectStacking: true,
      interactive: true,
    });

    fabricCanvas.on("object:selected", (options) => {
      if (options.target && options.target.type === "i-text") {
        setSelectedText(options.target);
      } else {
        setSelectedText(null);
      }
    });

    fabricCanvas.on("mouse:down", function (options) {
      if (options.target && options.target.type === "i-text") {
        setSelectedText(options.target);
      } else {
        setSelectedText(null);
      }
    });

    fabricCanvas.on("selection:created", function (options) {
      if (options.target && options.target.type === "i-text") {
        setSelectedText(options.target);
      }
    });

    fabricCanvas.on("selection:updated", function (options) {
      if (options.target && options.target.type === "i-text") {
        setSelectedText(options.target);
      }
    });

    fabricCanvas.on("selection:cleared", function () {
      setSelectedText(null);
    });

    fabricCanvas.on("text:changed", function (options) {
      if (options.target) {
        setSelectedText(options.target);
      }
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const setActiveTabWithReset = (tab) => {
    if (canvas) {
      canvas.isDrawingMode = false;
      setDrawingMode(false);
    }
    setActiveTab(tab);
  };

  const handleaddtext = () => {
    if (!canvas) return;

    const text = new fabric.IText("Click to edit text", {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontSize: 40,
      fontFamily: "Arial",
      fill: "#333333",
      textAlign: "center",
      originX: "center",
      originY: "center",
      selectable: true,
      editable: true,
      hasControls: true,
      hasBorders: true,
      borderColor: "#2196F3",
      cornerColor: "#2196F3",
      cornerSize: 8,
      transparentCorners: false,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    setSelectedText(text);
    canvas.requestRenderAll();
  };

  const handleTextPropertyChange = (property, value) => {
    if (!canvas || !selectedText) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "i-text") return;

    try {
      switch (property) {
        case "fontFamily":
          activeObject.set("fontFamily", value);
          break;
        case "fontSize":
          let newSize = parseInt(value);
          if (isNaN(newSize)) newSize = 40;
          newSize = Math.min(Math.max(newSize, 8), 200);

          activeObject.set("fontSize", newSize);
          activeObject.setCoords();
          break;
        case "fill":
          activeObject.set("fill", value);
          break;
        case "fontWeight":
          activeObject.set(
            "fontWeight",
            activeObject.fontWeight === "bold" ? "normal" : "bold"
          );
          break;
        case "fontStyle":
          activeObject.set(
            "fontStyle",
            activeObject.fontStyle === "italic" ? "normal" : "italic"
          );
          break;
        case "underline":
          activeObject.set("underline", !activeObject.underline);
          break;
      }
      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error updating text property:", error);
    }
  };

  const handleDrawingToolChange = (tool) => {
    if (!canvas) return;

    setDrawingTool(tool);
    setDrawingMode(true);
    canvas.isDrawingMode = true;

    if (tool === "eraser") {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = "#ffffff";
      canvas.freeDrawingBrush.width = brushSize * 2;
    } else if (tool === "pencil") {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = drawingColor;
      canvas.freeDrawingBrush.width = brushSize;
    } else if (tool === "pen") {
      canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
      canvas.freeDrawingBrush.color = drawingColor;
      canvas.freeDrawingBrush.width = brushSize;
    }

    canvas.renderAll();
  };

  const handleBrushSizeChange = (size) => {
    if (!canvas) return;
    setBrushSize(size);
    canvas.freeDrawingBrush.width = drawingTool === "eraser" ? size * 2 : size;
  };

  const handleDrawingColorChange = (color) => {
    if (!canvas || drawingTool === "eraser") return;
    setDrawingColor(color);
    canvas.freeDrawingBrush.color = color;
  };

  const handleAddShape = (shapeType) => {
    if (!canvas) return;

    let shape;
    switch (shapeType) {
      case "square":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: shapeColor,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: shapeColor,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });
        break;
      case "line":
        shape = new fabric.Line([50, 50, 200, 50], {
          stroke: shapeColor,
          strokeWidth: 2,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: shapeColor,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });
        break;
      case "ellipse":
        shape = new fabric.Ellipse({
          rx: 75,
          ry: 50,
          fill: shapeColor,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });
        break;
      case "star":
        const points = [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 125, y: 50 },
          { x: 150, y: 0 },
          { x: 250, y: 0 },
          { x: 175, y: 100 },
          { x: 200, y: 200 },
          { x: 125, y: 150 },
          { x: 50, y: 200 },
          { x: 75, y: 100 },
        ];
        shape = new fabric.Polygon(points, {
          fill: shapeColor,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
          scaleX: 0.4,
          scaleY: 0.4,
        });
        break;
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.requestRenderAll();
    }
  };

  const handleAddGraphic = (graphicType) => {
    if (!canvas) return;

    switch (graphicType) {
      case "splatter1":
        fabric.loadSVGFromURL(
          "/path/to/splatter1.svg",
          function (objects, options) {
            const graphic = fabric.util.groupSVGElements(objects, options);
            graphic.set({
              left: canvas.width / 2,
              top: canvas.height / 2,
              originX: "center",
              originY: "center",
              scaleX: 0.5,
              scaleY: 0.5,
            });
            canvas.add(graphic);
            canvas.setActiveObject(graphic);
            canvas.requestRenderAll();
          }
        );
        break;
    }
  };

  const handleDownloadAsPNG = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "poster.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAsPDF = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(dataURL, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("poster.pdf");
  };

  const handleBackgroundColorChange = (color) => {
    if (!canvas) return;
    canvas.backgroundColor = color;
    canvas.requestRenderAll();
    setBackgroundColor(color);
  };

  return (
    <div className="flex h-screen">
      <div className="w-48 bg-gray-200 p-5">
        <div
          className="mb-2 cursor-pointer"
          onClick={() => setActiveTabWithReset("design")}
        >
          <span className="block text-lg font-semibold">□ Design</span>
        </div>
        <div
          className="mb-2 cursor-pointer"
          onClick={() => setActiveTabWithReset("elements")}
        >
          <span className="block text-lg font-semibold">⧈ Elements</span>
        </div>
        <div
          className="mb-2 cursor-pointer"
          onClick={() => setActiveTabWithReset("text")}
        >
          <span className="block text-lg font-semibold">T Text</span>
        </div>
        <div
          className="mb-2 cursor-pointer"
          onClick={() => setActiveTabWithReset("uploads")}
        >
          <span className="block text-lg font-semibold">☁ Downloads</span>
        </div>
        <div
          className="mb-2 cursor-pointer"
          onClick={() => setActiveTabWithReset("draw")}
        >
          <span className="block text-lg font-semibold">✎ Draw</span>
        </div>
      </div>

      <div className="flex-grow bg-white flex justify-center items-center">
        <canvas ref={canvasRef} id="canvas" />
      </div>

      {activeTab === "text" && (
        <div className="p-5 bg-gray-100">
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleaddtext}
          >
            Add a text box
          </button>
          <div className="mb-4">
            <select
              className="block w-full p-2 border rounded"
              value={selectedText ? selectedText.fontFamily : "Arial"}
              onChange={(e) =>
                handleTextPropertyChange("fontFamily", e.target.value)
              }
              disabled={!selectedText}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              min="8"
              max="200"
              step="1"
              value={selectedText ? Math.round(selectedText.fontSize) : 40}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (!isNaN(newValue)) {
                  handleTextPropertyChange("fontSize", newValue);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const currentSize = selectedText?.fontSize || 40;
                  const change = e.key === "ArrowUp" ? 1 : -1;
                  handleTextPropertyChange("fontSize", currentSize + change);
                }
              }}
              className="block w-full p-2 border rounded"
              disabled={!selectedText}
            />
          </div>
          <div className="mb-4">
            <input
              type="color"
              value={selectedText ? selectedText.fill : "#000000"}
              onChange={(e) => handleTextPropertyChange("fill", e.target.value)}
              className="block w-full p-2 border rounded"
              disabled={!selectedText}
            />
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 border rounded ${
                selectedText?.fontWeight === "bold"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => handleTextPropertyChange("fontWeight")}
              disabled={!selectedText}
            >
              B
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                selectedText?.fontStyle === "italic"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => handleTextPropertyChange("fontStyle")}
              disabled={!selectedText}
            >
              I
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                selectedText?.underline ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTextPropertyChange("underline")}
              disabled={!selectedText}
            >
              U
            </button>
          </div>
        </div>
      )}

      {activeTab === "draw" && (
        <div className="p-5 bg-gray-100">
          <div className="mb-4">
            <button
              className={`px-4 py-2 border rounded ${
                drawingTool === "pencil" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleDrawingToolChange("pencil")}
            >
              Pencil
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                drawingTool === "pen" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleDrawingToolChange("pen")}
            >
              Pen
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                drawingTool === "eraser" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleDrawingToolChange("eraser")}
            >
              Eraser
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <span>{brushSize}px</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Color</label>
            <input
              type="color"
              value={drawingColor}
              onChange={(e) => handleDrawingColorChange(e.target.value)}
              className="block w-full p-2 border rounded"
              disabled={drawingTool === "eraser"}
            />
          </div>
        </div>
      )}

      {activeTab === "elements" && (
        <div className="p-5 bg-gray-100">
          <div className="mb-4">
            <label className="block mb-2">Shape Color</label>
            <input
              type="color"
              value={shapeColor}
              onChange={(e) => setShapeColor(e.target.value)}
              className="block w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("square")}
            >
              <div
                className="w-10 h-10 bg-gray-300"
                style={{ backgroundColor: shapeColor }}
              ></div>
            </button>
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("circle")}
            >
              <div
                className="w-10 h-10 bg-gray-300 rounded-full"
                style={{ backgroundColor: shapeColor }}
              ></div>
            </button>
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("line")}
            >
              <div
                className="w-10 h-1 bg-gray-300"
                style={{ backgroundColor: shapeColor }}
              ></div>
            </button>
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("triangle")}
            >
              <div
                className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-gray-300"
                style={{ borderBottomColor: shapeColor }}
              ></div>
            </button>
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("ellipse")}
            >
              <div
                className="w-10 h-5 bg-gray-300 rounded-full"
                style={{ backgroundColor: shapeColor }}
              ></div>
            </button>
            <button
              className="p-4 border rounded"
              onClick={() => handleAddShape("star")}
            >
              <div
                className="w-10 h-10 bg-gray-300"
                style={{ backgroundColor: shapeColor }}
              ></div>
            </button>
          </div>
        </div>
      )}

      {activeTab === "uploads" && (
        <div className="p-5 bg-gray-100">
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleDownloadAsPNG}
          >
            Download as PNG
          </button>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleDownloadAsPDF}
          >
            Download as PDF
          </button>
          <div>
            <span className="block text-lg font-semibold">
              Download Options
            </span>
            <p>Choose your preferred format to download the poster</p>
          </div>
        </div>
      )}

      {activeTab === "design" && (
        <div className="p-5 bg-gray-100">
          <div className="mb-4">
            <label className="block mb-2">Canvas Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="block w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardEditor;
