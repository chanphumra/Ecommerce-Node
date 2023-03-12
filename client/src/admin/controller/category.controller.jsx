import axios from "axios";

export const createCategory = async (props) => {

    const data = {
        main_id: props.main_id,
        name: props.name,
        description: props.description,
        image: props.image
    }

    const url = props.isMain ? 'http://localhost:8000/api/maincategory' : 'http://localhost:8000/api/subcategory';

    try {
        const res = await axios.post(url, data , {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}

export const deleteCategory = async (props) => {
    
}