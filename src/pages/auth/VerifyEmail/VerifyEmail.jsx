import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styles from "./styles.module.css";
import success from "../../../images/success.png";



const VerifyEmail = () => {
    const param = useParams()
    const [validUrl, setValidUrl] = useState(false);    
    const navigate = useNavigate()


    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `https://ecweb-backend.onrender.com/api/v1/users/${param.id}/verify/${param.token}/`;
				const { data } = await axios.post(url);
				setValidUrl(true);
			} catch (error) {
				// console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, []);


    return (
		<div>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);

}

export default VerifyEmail