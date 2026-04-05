import { LogIn, LogOut, User } from 'lucide-react';
import { auth, loginWithGoogle, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserHeader() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-between mb-8 animate-pulse">
        <div className="h-8 w-32 bg-emerald-100 rounded-full"></div>
        <div className="h-8 w-8 bg-emerald-100 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-8">
      {user ? (
        <>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-2 border-emerald-500">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} referrerPolicy="no-referrer" />
              ) : (
                <User className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-medium">Bienvenido</p>
              <p className="text-sm font-bold text-gray-800">{user.displayName || 'Usuario'}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Modo Invitado</p>
              <p className="text-sm font-bold text-gray-400 italic">Inicia sesión para guardar progreso</p>
            </div>
          </div>
          <button
            onClick={() => loginWithGoogle()}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
        </>
      )}
    </div>
  );
}
