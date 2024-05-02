export default function EditProfile() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:text-white">
            <div className="bg-white dark:bg-zinc-800 w-full max-w-md mx-4 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Editar Perfil</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nombre</label>
                        <input type="text" id="name" name="name" className="mt-1 block w-full border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Apellido</label>
                        <input type="text" id="lastName" name="lastName" className="mt-1 block w-full border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Contraseña</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
