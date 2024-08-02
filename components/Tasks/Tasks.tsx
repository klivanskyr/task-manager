import { useEffect, useState } from 'react';

import Header from './Header';
import Filter from './Filter';
import Table from './Table';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!response.ok) {
            // Handle error
        } else {
            const data = await response.json();
            setTasks(data);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <Header />
            <Filter>
                <Table />
            </Filter>
        </div>
    )
}