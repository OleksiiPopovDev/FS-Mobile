import Login from "@/app/login";
import {UserRepository} from "@/app/database/repository/user.repository";
import {useEffect} from "react";


export default function App() {
    useEffect(() => {
        const fetchUsers = async () => {
            const userRepository = new UserRepository();
            const users = await userRepository.getAllUsers();
            console.log("Users from DB:", users);
        };

        fetchUsers().then((user) => console.log(user));
    }, []);
    return (
        <Login/>
    )
}
