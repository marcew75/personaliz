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
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, type }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      const parsedData = JSON.parse(data);
      setDroppedItems([...droppedItems, parsedData]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <h3>Sustancias</h3>
        {SUBSTANCES.map((substance) => (
          <div
            key={substance}
            draggable
            onDragStart={(e) => handleDragStart(e, substance, 'substance')}
            style={styles.draggableItem}
          >
            {substance}
          </div>
        ))}
      </div>

      <div style={styles.listContainer}>
        <h3>Formas</h3>
        {FORMS.map((form) => (
          <div
            key={form}
            draggable
            onDragStart={(e) => handleDragStart(e, form, 'form')}
            style={styles.draggableItem}
          >
            {form}
          </div>
        ))}
      </div>

      <div
        style={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3>Zona de Drop</h3>
        {droppedItems.map((item, index) => (
          <div key={index} style={styles.droppedItem}>
            {item.type}: {item.item}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '16px',
  },
  listContainer: {
    flex: '1 1 200px',
    minWidth: '200px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
  },
  draggableItem: {
    padding: '8px',
    margin: '4px 0',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    cursor: 'grab',
  },
  dropZone: {
    flex: '1 1 100%',
    minHeight: '200px',
    border: '2px dashed #aaa',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: '#fafafa',
  },
  droppedItem: {
    marginTop: '8px',
    padding: '4px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
  },
};

export default SubstanceFormDnD;
