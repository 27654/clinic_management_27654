function ClinicButton(props) {
  return (
    <button type="button" onClick={props.actionButton}>
      {props.buttonLabel}
    </button>
  );
}

export default ClinicButton;
