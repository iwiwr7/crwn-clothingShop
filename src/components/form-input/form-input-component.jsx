import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {

    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label
                    // tuk s tozi classname dawame kogato neshto se pishe w label-a da se raztegne ako ne se pishe nishto ili se mine na drug komnponent da se swie (functional classname (priema functionalnost))
                    className={`${otherProps.value.length ? 'shrink' : ''
                        } form-input-label`}
                >

                    {label}

                </label>
            )}
        </div>
    );
};
export default FormInput;