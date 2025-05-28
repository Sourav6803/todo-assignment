// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Dialog } from "@headlessui/react";
// import DeleteTodoModal from "../utils/DeleteTodoModal";
// import EditTodoModal from "../utils/EditTodoModal";

// export interface Todo {
//   id: string;
//   text: string;
//   completed: boolean;
//   createdAt: number; // store as timestamp number (Date.now())
//   dueDate?: number | null;
// }

// type Filter = "all" | "active" | "completed";

// interface TodoPageProps {
//   userId: string;
// }

// const PAGE_SIZE = 10;

// const TodoPage: React.FC<TodoPageProps> = ({ userId }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [text, setText] = useState("");
//   const [filter, setFilter] = useState<Filter>("all");
//   const [dueDate, setDueDate] = useState<string>("");
//   const [editTodo, setEditTodo] = useState<Todo | null>(null);
//   const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);
//   const [page, setPage] = useState(1);

//   // localStorage key for this user's todos
//   const STORAGE_KEY = `todos_${userId}`;

//   // Load todos from localStorage on mount or userId change
//   useEffect(() => {
//     const storedTodos = localStorage.getItem(STORAGE_KEY);
//     if (storedTodos) {
//       setTodos(JSON.parse(storedTodos));
//     } else {
//       setTodos([]);
//     }
//     setPage(1);
//   }, [userId]);

//   const addTodo = () => {
//     if (!text.trim()) {
//       return toast.error("Please enter a todo!");
//     }
//     if (!dueDate) {
//       return toast.error("Please select a due date!");
//     }
//     const newTodo: Todo = {
//       id: crypto.randomUUID(),
//       text: text.trim(),
//       completed: false,
//       createdAt: Date.now(),
//       dueDate: dueDate ? new Date(dueDate).getTime() : null,
//     };
//     const updatedTodos = [newTodo, ...todos];
//     setTodos(updatedTodos);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos)); // explicit sync
//     setText("");
//     setDueDate("");
//     setPage(1);
//   };

//   // Toggle complete
//   const toggleComplete = (id: string) => {
//     setTodos((prev) =>
//       prev.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const handleDelete = () => {
//     if (!deleteTodo) return;
//     setTodos(todos.filter((t) => t.id !== deleteTodo.id));
//     setDeleteTodo(null);
//     toast.success("Todo deleted!");
//   };

// //   const handleEditSave = () => {
// //     if (!editTodo?.text || !editTodo.dueDate) {
// //       return toast.error("Text and Due Date required!");
// //     }

// //     setTodos(todos.map((t) => (t.id === editTodo.id ? editTodo : t)));
// //     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

// //     setEditTodo(null);
// //     toast.success("Todo updated!");
// //   };

//   // Filtered todos based on filter
  
//   const handleEditSave = () => {
//   if (!editTodo?.text || !editTodo.dueDate) {
//     return toast.error("Text and Due Date required!");
//   }

//   const updatedTodos = todos.map((t) =>
//     t.id === editTodo.id ? editTodo : t
//   );

//   setTodos(updatedTodos);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos)); // ✅ Save the updated list

//   setEditTodo(null);
//   toast.success("Todo updated!");
// };
  
//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   // Pagination: slice todos for current page
//   const paginatedTodos = filteredTodos.slice(0, page * PAGE_SIZE);

//   // Load more todos (increment page)
//   const loadMore = () => {
//     setPage((p) => p + 1);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-6 text-center">Your Todos</h1>

//       <div className="flex space-x-2 mb-6">
//         <input
//           type="text"
//           placeholder="Add new task..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="flex-grow p-3 border rounded shadow-sm"
//         />
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="p-3 border rounded shadow-sm"
//         />
//         <button
//           onClick={addTodo}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded"
//           disabled={!text.trim()}
//         >
//           Add
//         </button>
//       </div>

//       {/* Filter buttons */}
//       <div className="flex justify-center space-x-4 mb-4">
//         {(["all", "active", "completed"] as Filter[]).map((f) => (
//           <button
//             key={f}
//             onClick={() => {
//               setFilter(f);
//               setPage(1);
//             }}
//             className={`px-4 py-2 rounded ${
//               filter === f
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       <ul className="space-y-2">
//         {paginatedTodos.length === 0 && (
//           <li className="text-center text-gray-500">No todos found.</li>
//         )}
//         {paginatedTodos.map((todo) => (
//           <li
//             key={todo.id}
//             className="flex justify-between items-center bg-white p-3 rounded shadow"
//           >
//             <div className="flex items-center gap-3">
//                 <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleComplete(todo.id)}
//               className="w-5 h-5"
//             />
//             <div>
//               <p
//                 className={`${
//                   todo.completed ? "line-through text-gray-400" : ""
//                 }`}
//               >
//                 {todo.text}
//               </p>
//               <small className="text-sm text-gray-500">
//                 Due:{" "}
//                 {todo.dueDate
//                   ? new Date(todo.dueDate).toLocaleDateString()
//                   : "No due date"}
//               </small>
//             </div>
            
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setEditTodo(todo)}
//                 className="text-blue-500 hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => setDeleteTodo(todo)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Load more button */}
//       {paginatedTodos.length < filteredTodos.length && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={loadMore}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {/* Edit Modal */}
//       <Dialog
//         open={!!editTodo}
//         onClose={() => setEditTodo(null)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
//           <Dialog.Panel className="bg-white rounded p-4 space-y-4 w-96">
//             <Dialog.Title>Edit Todo</Dialog.Title>
//             <input
//               type="text"
//               value={editTodo?.text || ""}
//               onChange={(e) =>
//                 setEditTodo({ ...editTodo!, text: e.target.value })
//               }
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="date"
//               value={
//                 editTodo?.dueDate
//                   ? new Date(editTodo.dueDate).toISOString().split("T")[0]
//                   : ""
//               }
//               onChange={(e) =>
//                 setEditTodo({
//                   ...editTodo!,
//                   dueDate: new Date(e.target.value).getTime(),
//                 })
//               }
//               className="w-full p-2 border rounded"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setEditTodo(null)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEditSave}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>

//       {/* <EditTodoModal
//   todo={editTodo}
//   onClose={() => setEditTodo(null)}
//   onSave={handleEditSave}
// /> */}


//       {/* Delete Confirmation Modal */}
      

//       <DeleteTodoModal
//   todo={deleteTodo}
//   onClose={() => setDeleteTodo(null)}
//   onConfirm={handleDelete}
// />
//     </div>
//   );
// };

// export default TodoPage;



import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import DeleteTodoModal from "../utils/DeleteTodoModal";
import EditTodoModal from "../utils/EditTodoModal";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dueDate?: number | null;
}

type Filter = "all" | "active" | "completed";

interface TodoPageProps {
  userId: string;
}

const PAGE_SIZE = 10;

const TodoPage: React.FC<TodoPageProps> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [dueDate, setDueDate] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);
  const [page, setPage] = useState(1);

  const STORAGE_KEY = `todos_${userId}`;

  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    setPage(1);
  }, [userId]);

  const addTodo = () => {
    if (!text.trim()) return toast.error("Please enter a todo!");
    if (!dueDate) return toast.error("Please select a due date!");

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      dueDate: new Date(dueDate).getTime(),
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    setText("");
    setDueDate("");
    setPage(1);
  };

  const toggleComplete = (id: string) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleDelete = () => {
    if (!deleteTodo) return;
    const updated = todos.filter(t => t.id !== deleteTodo.id);
    setTodos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setDeleteTodo(null);
    toast.success("Todo deleted!");
  };

  const handleEditSave = () => {
    if (!editTodo?.text || !editTodo.dueDate) {
      return toast.error("Text and Due Date required!");
    }

    const updatedTodos = todos.map(t => (t.id === editTodo.id ? editTodo : t));
    setTodos(updatedTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    setEditTodo(null);
    toast.success("Todo updated!");
  };

  const filteredTodos = todos.filter(todo =>
    filter === "active" ? !todo.completed :
    filter === "completed" ? todo.completed :
    true
  );

  const paginatedTodos = filteredTodos.slice(0, page * PAGE_SIZE);

  return (
    <div className=" px-4 sm:px-6 py-8 dark:bg-gray-700 w-full h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Your Todos</h1>

      {/* Input section */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Add new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow p-3 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-3 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={addTodo}
          disabled={!text.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-6">
        {(["all", "active", "completed"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
            className={`px-4 py-2 rounded ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="space-y-4">
        {paginatedTodos.length === 0 && (
          <li className="text-center text-gray-500 dark:text-gray-400">No todos found.</li>
        )}
        {paginatedTodos.map(todo => (
          <li key={todo.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start flex-col sm:flex-row">
            <div className="flex gap-3 items-start">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-5 h-5 mt-1"
              />
              <div>
                <p className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-white"}`}>
                  {todo.text}
                </p>
                <small className="text-sm text-gray-500 dark:text-gray-400">
                  Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}
                </small>
              </div>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => setEditTodo(todo)}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteTodo(todo)}
                className="text-red-600 hover:underline dark:text-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Load More */}
      {paginatedTodos.length < filteredTodos.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editTodo} onClose={() => setEditTodo(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-600 p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-semibold dark:text-white">Edit Todo</Dialog.Title>
            <input
              type="text"
              value={editTodo?.text || ""}
              onChange={(e) => setEditTodo({ ...editTodo!, text: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="date"
              value={editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setEditTodo({
                  ...editTodo!,
                  dueDate: new Date(e.target.value).getTime(),
                })
              }
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditTodo(null)} className="px-4 py-2 border rounded dark:text-white">Cancel</button>
              <button onClick={handleEditSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Modal */}
      <DeleteTodoModal
        todo={deleteTodo}
        onClose={() => setDeleteTodo(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TodoPage;
