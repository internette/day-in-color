import styles from "./addEventButton.module.scss";
export default function AddEventButton(){
    return <a href="/add-event" className={styles.addEventBtn}>
        +
    </a>
}