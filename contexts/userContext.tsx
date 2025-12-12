
//create context
//useContext to make context available
//context provider to wrap around app

import { createContext, useContext, useState, type ReactNode } from "react";

export interface UserData {
    _id: string;
    username: string;
    email: string
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    refreshUser: () => Promise<void>;
    isUserLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export const UserProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

    const refreshUser = async () => {
        setIsUserLoading(true);
        try {
            const res = await fetch('/api/user').then(res => res.json());
            
            if(res.success){
                setUser(res.user)
            }
        } catch (error) {
            console.error("Failed to refresh user:", error);
            setUser(null);
        } finally {
            setIsUserLoading(false);
        }   
    }
    return (
        <UserContext.Provider value={{ user, setUser, refreshUser, isUserLoading }}>
            {children}
        </UserContext.Provider>
    );
}