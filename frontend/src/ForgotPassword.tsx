import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from './components/Input';
import { requestResetToken, verifyResetToken, resetPassword } from './util/authenticate';
type Stage = {
    name: Stages;
    state: {
        email: string;
        code: string;
    };
};
enum Stages {
    EMAIL,
    RESET_CODE,
    NEW_PASSWORD
};
const ForgotPassword = () => {
    const [stage, setStage] = useState<Stage>({
        name: Stages.EMAIL,
        state: {email: "", code: ""}
    });
    if (stage.name === Stages.EMAIL){
        return <EmailStage stage={stage} setStage={setStage} />
    } else if(stage.name === Stages.RESET_CODE) {
        return <ResetCodeStage stage={stage} setStage={setStage} />
    } else if(stage.name === Stages.NEW_PASSWORD) {
        return <NewPasswordStage stage={stage} setStage={setStage} />
    } else {
        return (
            <div>
                You are not supposed to be here.
            </div>
        )
    }
}

const EmailStage = (props: {stage: Stage, setStage: (stage: Stage) => void}) => {
    const [waitMessage, setWaitMessage] = useState("");
    const [email, setEmail] = useState("");
    const onClick = async (event: any) => {
        event.preventDefault();
        setWaitMessage("Please wait while we process your information.")
        // send the get reset token request here
        await requestResetToken(email).then(res => {
            if(res.status === "OK") {
                props.setStage({name: Stages.RESET_CODE, state: {...props.stage.state, email: email}});
				Swal.fire({ icon: 'success', text: "You have confirmed", timer: 1000, showConfirmButton: false });
                setWaitMessage("")
            } else {
				Swal.fire({ icon: 'error', text: "Sorry email could not be verified, please try again!", timer: 1000, showConfirmButton: false });
                setWaitMessage("")
            }
        }).catch(err => {
            Swal.fire({icon: "error", text: "Sorry there was an error, redirecting you to login page.", timer: 3000, showConfirmButton: false});
            setWaitMessage("")
        });
    }
    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setEmail(value);
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <Input label="Email" name={"Email"} onChange={handleChange} value={email} />
            <button disabled={waitMessage !== "" ? true : false} className='action-button p-5' onClick={onClick}>Generate Token</button>
            <p>{waitMessage}</p>
        </div>
    );
}

const ResetCodeStage = (props: {stage: Stage, setStage: (stage: Stage) => void}) => {
    const [waitMessage, setWaitMessage] = useState("");
    const [code, setCode] = useState("");
    const onClick = async (event: any) => {
        event.preventDefault();
        setWaitMessage("Please wait while we process your information.")
        await verifyResetToken(props.stage.state?.email, code).then(res => {
            if(res.status === "OK") {
                props.setStage({name: Stages.NEW_PASSWORD, state: {...props.stage.state, code: code}});
				Swal.fire({ icon: 'success', text: "Code has been confirmed!", timer: 2000, showConfirmButton: false });
            } else {
				Swal.fire({ icon: 'error', text: "Sorry reset code could not be verified, please try again!", timer: 2000, showConfirmButton: false });
            }
            setWaitMessage("");
        }).catch(err => {
            Swal.fire({icon: "error", text: "Sorry there was an error, redirecting you to login page.", timer: 3000, showConfirmButton: false});
            setWaitMessage("")
        });
    }
    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setCode(value);
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <Input label="Code" name={"Code"} onChange={handleChange} value={code} />
            <button disabled={waitMessage !== "" ? true : false} className='action-button p-5' onClick={onClick}>Verify</button>
            <p>{waitMessage}</p>
        </div>
    );
}

const NewPasswordStage = (props: {stage: Stage, setStage: (stage: Stage) => void}) => {
    const [waitMessage, setWaitMessage] = useState("");
    const history = useHistory();
    const {email, code} = props.stage.state;
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const onClick = async (event: any) => {
        event.preventDefault();
        // send the get reset token request here
        setWaitMessage("Please wait while we process your information.")
        await resetPassword(email, code, form.password, form.confirmPassword).then(res => {
            console.log(res);
            if(res.status === "OK") {
				Swal.fire({ icon: 'success', text: "Code has been confirmed!", timer: 2000, showConfirmButton: false });
                history.push("/login");
            } else {
				Swal.fire({ icon: 'error', text: "Sorry reset code could not be verified, please try again!", timer: 2000, showConfirmButton: false });
                history.push("/login")
            }
            setWaitMessage("")
        }).catch(err => {
            Swal.fire({icon: "error", text: "Sorry there was an error, redirecting you to login page.", timer: 3000, showConfirmButton: false});
            setWaitMessage("")
        });
    }
    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setForm({...form, [name]: value});
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <Input label="New Password" name={"password"} onChange={handleChange} value={form.password} type="password" />
            <Input label="Confirm new password" name={"confirmPassword"} onChange={handleChange} value={form.confirmPassword} type="password" />
            <button disabled={waitMessage !== "" ? true : false}  className='action-button p-5' onClick={onClick}>Reset</button>
        </div>
    );
}

export default ForgotPassword;