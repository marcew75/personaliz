import React, { useState } from 'react';

// Sustancias predefinidas
const SUBSTANCES = [
  'Agua', 'Aceite', 'Alcohol', 'Ácido', 
  'Base', 'Sal', 'Azúcar', 'Metal', 
  'Gas', 'Polvo'
];

// Formas predefinidas
const FORMS = [
  'Esfera', 'Cubo', 'Cilindro', 'Prisma', 
  'Pirámide', 'Cono', 'Anillo', 'Tubo', 
  'Placa', 'Espiral'
];

const SubstanceFormDnD = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item, type) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ text: item, type }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    // Prevent duplicates
    if (!droppedItems.some(item => item.text === droppedItem.text)) {
      setDroppedItems(prev => [...prev, droppedItem]);
    }
  };

  const removeItem = (text) => {
    setDroppedItems(prev => prev.filter(item => item.text !== text));
  };

  const renderDraggableList = (items, type) => {
    return items.map(item => (
      <div 
        key={item}
        draggable 
        onDragStart={(e) => handleDragStart(e, item, type)}
        className={`p-2 m-1 border rounded cursor-move 
          ${type === 'substance' ? 'bg-blue-100' : 'bg-green-100'}`}
      >
        {item}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Sustancias y Formas
      </h1>
      <p className="text-center mb-6">
        Arrastra y suelta sustancias y formas para crear combinaciones únicas.
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Columna de Sustancias */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">Sustancias</h2>
          {renderDraggableList(SUBSTANCES, 'substance')}
        </div>
        
        {/* Zona Central de Drop */}
        <div 
          className="border p-4 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h2 className="text-xl font-semibold mb-4">Zona de Combinación</h2>
          <div className="flex flex-wrap gap-2">
            {droppedItems.map((item) => (
              <div 
                key={item.text} 
                className={`p-2 m-1 border rounded flex items-center 
                  ${item.type === 'substance' ? 'bg-blue-100' : 'bg-green-100'}`}
              >
                {item.text}
                <button 
                  onClick={() => removeItem(item.text)} 
                  className="ml-2 text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Columna de Formas */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">Formas</h2>
          {renderDraggableList(FORMS, 'form')}
        </div>
      </div>
    </div>
  );
};

export default SubstanceFormDnD;