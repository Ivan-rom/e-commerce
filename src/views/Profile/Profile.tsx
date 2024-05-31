import { MotionConfig, motion } from 'framer-motion';
import UserInfo from './UserInfo';
import Password from './Password';
import { useState } from 'react';
export default function Profile() {
  const [activeTab, setActiveTab] = useState('info');
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="grid grid-cols-6 gap-4">
          <div>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('info')}
                  className={activeTab === 'info' ? 'font-bold transition-all' : ''}
                >
                  Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('password')}
                  className={activeTab === 'password' ? 'font-bold transition-all' : ''}
                >
                  Password
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('addresses')}>Addresses </button>
              </li>
            </ul>
          </div>
          <div className="col-span-5">
            {activeTab === 'info' && <UserInfo />}
            {activeTab === 'password' && <Password />}
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
