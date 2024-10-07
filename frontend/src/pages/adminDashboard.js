import AdminForm from '../components/adminForm';
import GovernerForm from '../components/governerForm';
import DeleteAdmin from '../components/DeleteAdmin';
import CategoryForm from '../components/categoryForm';
import { useEffect, useState } from "react";
import CategoryDetails from "../components/categoryDetails";

const AdminSignup = () => {
    const [categories, setCategories] = useState([]); // Initialize as an empty array
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categoryRoutes');
            const json = await response.json();

            if (response.ok) {
                setCategories(json);
            }
        };

        fetchCategories();
    }, []);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Categories
            </button>
            {isVisible && (
                <div className="categories">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <CategoryDetails category={category} key={category._id} /> // Use category prop
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </div>
            )}
            <AdminForm />
            <br />
            <GovernerForm />
            <br />
            <DeleteAdmin />
            <br />
            <CategoryForm />
        </div>
    );
};

export default AdminSignup;
