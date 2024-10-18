import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast from 'react-hot-toast';
const bookInitialValues = {
    title: '',
    author: '',
    description: '',
    price: '',
    isbn: ''
}
const BookForm = () => {
    // update function
    const addBook = async (values, { resetForm }) => {
        try {
            const addBook = await axios.post("http://localhost:8080/book/addBook", values);
            if (addBook.status === 200) {
                toast.success(addBook.data);
            }
        } catch (error) {
            toast.error("something went wrong");
        } finally {
            resetForm();
        }
    }
    const bookInputValidation = Yup.object({
        title: Yup.string().min(3, "Minimum 3 Characters").required(),
        author: Yup.string().min(3, "Minimum 3 Characters").required(),
        description: Yup.string(),
        price: Yup.string().required(),
        isbn: Yup.string()
    })

    const validationFunction = useFormik({
        initialValues: bookInitialValues,
        validationSchema: bookInputValidation,
        onSubmit: addBook
    });

    return (
        <div className='h-screen flex justify-center items-center'>
            <form className="modal-box" onSubmit={validationFunction.handleSubmit}>
                <h3 className="font-bold text-lg text-center mb-3">Add New Book</h3>
                <div className='mb-4 text-center'>
                    <input type="text" name='title' placeholder="Book Title" value={validationFunction.values.title} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.title && validationFunction.errors.title ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='author' placeholder="Book Author" value={validationFunction.values.author} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.author && validationFunction.errors.author ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="number" name='price' placeholder="Book Price" value={validationFunction.values.price} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.price && validationFunction.errors.price ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='description' placeholder="Book Description" value={validationFunction.values.description} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.description && validationFunction.errors.description ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='isbn' placeholder="Book ISBN" value={validationFunction.values.isbn} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.isbn && validationFunction.errors.isbn ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <button className='btn btn-primary block m-auto' type='submit'>Update</button>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </div>
    )
}

export default BookForm