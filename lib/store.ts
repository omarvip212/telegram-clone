import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: number
}

interface ChatStore {
  currentUser: User | null
  messages: Message[]
  users: User[]
  setCurrentUser: (user: User | null) => void
  addMessage: (message: Message) => void
  getMessages: (userId: string) => Message[]
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  updateProfile: (user: Partial<User>) => void
  logout: () => void
}

// محاكاة قاعدة بيانات المستخدمين
const mockUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice' },
  { id: '2', name: 'Bob', email: 'bob@example.com', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Charlie' },
]

export const useStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      messages: [],
      users: mockUsers,

      setCurrentUser: (user) => set({ currentUser: user }),

      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),

      getMessages: (userId) => {
        const state = get()
        const currentUserId = state.currentUser?.id
        return state.messages.filter(
          msg => 
            (msg.senderId === currentUserId && msg.receiverId === userId) ||
            (msg.senderId === userId && msg.receiverId === currentUserId)
        ).sort((a, b) => a.timestamp - b.timestamp)
      },

      login: async (email, password) => {
        const user = mockUsers.find(u => u.email === email)
        if (user) {
          set({ currentUser: user })
          return true
        }
        return false
      },

      register: async (email, password, name) => {
        if (mockUsers.some(u => u.email === email)) {
          return false
        }
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
        }
        set((state) => ({ 
          users: [...state.users, newUser],
          currentUser: newUser
        }))
        return true
      },

      updateProfile: (userData) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, ...userData } : null,
        users: state.users.map(user => 
          user.id === state.currentUser?.id 
            ? { ...user, ...userData }
            : user
        )
      })),

      logout: () => set({ currentUser: null })
    }),
    {
      name: 'chat-store'
    }
  )
) 