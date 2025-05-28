// components/EditTodoModal.tsx
import React, { useState, useEffect } from "react";
import type { Todo } from "../components/TodoPage";
// import { Todo } from "../components/TodoPage";

interface EditTodoModalProps {
  todo: Todo | null;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose, onSave }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "");
    }
  }, [todo]);

  const handleSave = () => {
    if (!text.trim() || !dueDate) return;
    onSave({ ...todo!, text: text.trim(), dueDate: new Date(dueDate).getTime() });
  };

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-96 space-y-4">
        <h2 className="text-xl font-bold">Edit Todo</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
