// Imports React and the application's CSS file
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Menu from './components/Menu';

function App() {
  const cavasRef = useRef(null);
  const ctxRef = useRef(null);
  const [ isDrawing, setIsDrawing ] = useState(false);
  const [lineWidth, setLineWidth ] = useState(5)
  const [ lineColor, setLineColor ] = useState("black");
  const [lineOpacity , setLineOpacity] = useState(0.1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    const canvas = cavasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;

  },[lineColor,lineWidth,lineOpacity]);

  const startDrawing = ((e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    );
    setIsDrawing(true);
  });

  const endDrawing = (() => {
    const canvas = cavasRef.current;
    ctxRef.current.closePath();
    const newHistory = [...history.slice(0, historyIndex + 1), canvas.toDataURL()];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsDrawing(false);
  });

  const draw = ((e) => {
    if(!isDrawing){
      return;
    }
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    )

    ctxRef.current.stroke();
  });

  const clearCanvas = () => {
    const canvas = cavasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;
  };

  const undo = (() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        const canvas = cavasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        
        // Reset drawing state
        setIsDrawing(false);
      };
      setHistoryIndex(newIndex);
    }
  });

  return (
    <div className="App">
      <h1>Paint Web</h1>
      <Menu setlineWidth={setLineWidth} setlineColor={setLineColor} setlineOpacity={setLineOpacity} />
      <button 
          className='clear'
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button 
          className='undo'
          onClick={undo} 
          disabled={historyIndex <= 0}
          
        >
          Undo
        </button>
      <canvas onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseMove={draw} ref={cavasRef} width={`1280px`} height={`720px`} />
    </div>
  );
}

export default App;
