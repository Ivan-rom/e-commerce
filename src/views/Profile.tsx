import { PencilIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { Auth } from '../scripts/constants/apInterfaces';
export default function Profile() {
  const user = useSelector((state: Auth) => state.auth.user.user);
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Profile</h1>
        <div className="profile">
          <ul>
            <li className="flex gap-3">
              <p className="font-semibold"> First name: </p>
              <p className="flex gap-3 items-center">
                {user.firstName}
                <PencilIcon className="h-4" />
              </p>
            </li>
            <li className="flex gap-3">
              <p className="font-semibold"> Last name: </p>
              <p className="flex gap-3 items-center">
                {user.lastName}
                <PencilIcon className="h-4" />
              </p>
            </li>
            <li className="flex gap-3">
              <p className="font-semibold"> Birthday: </p>
              <p className="flex gap-3 items-center">
                {user.dateOfBirth}
                <PencilIcon className="h-4" />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
