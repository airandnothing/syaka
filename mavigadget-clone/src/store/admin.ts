import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAdminAuthenticated: boolean;
  adminUser: {
    username: string;
    email: string;
  } | null;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
}

// 管理员账号配置（初心者设置）
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'mavigadget2025', // 简单易记的密码
  email: 'admin@mavigadget.com'
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdminAuthenticated: false,
      adminUser: null,

      adminLogin: (username: string, password: string) => {
        // 简单的管理员验证
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          set({
            isAdminAuthenticated: true,
            adminUser: {
              username: ADMIN_CREDENTIALS.username,
              email: ADMIN_CREDENTIALS.email
            }
          });
          return true;
        }
        return false;
      },

      adminLogout: () => {
        set({
          isAdminAuthenticated: false,
          adminUser: null
        });
      },
    }),
    {
      name: 'mavigadget-admin',
    }
  )
);
