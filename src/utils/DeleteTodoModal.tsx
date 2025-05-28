// components/DeleteTodoModal.tsx
import React from "react";
import type { Todo } from "../components/TodoPage";
// import { Todo } from "../types";

interface DeleteTodoModalProps {
  todo: Todo | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({ todo, onClose, onConfirm }) => {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{todo.text}</strong>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={() => onConfirm(todo.id)} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodoModal;
