import Image from 'next/image';
import styles from './NewUsers.module.css';

const NewUsers = () => (
  <div className="d-flex align-items-center">
    <Image
      src="https://avatar.tobi.sh/random?size=512"
      height="30"
      width="30"
      alt={`Profile picture of Jonny Horn`}
    />
    <h4 className={`h6 ml-2 pt-2 ${styles.name}`}>Jonny Horn</h4>
    <p className="ml-auto">+</p>
  </div>
);

export default NewUsers;
