import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Colors from '@/data/Colors';
import FloatingNavbar from '@/components/NavBar';
import { useRouter } from 'expo-router';
import { getAllUsers, deleteUser, logout } from '@/server/auth';
import { ToastContext, ToastContextType } from '@/components/ToastManager';
import NotifyPopup from '@/components/NotifyPopup';

export default function Settings() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [email, setEmail] = useState('email@example.com');
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [popupAction, setPopupAction] = useState<'logout' | 'delete' | null>(
    null
  );
  const toastContext = useContext<ToastContextType | undefined>(ToastContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        if (users && users.length > 0) {
          setUserName(users[0].name);
          setEmail(users[0].email);
        } else {
          setUserName('Guest');
          setEmail('email@example.com');
        }
      } catch (error) {
        console.error('Error Fetching user:', error);
        setUserName('Guest');
        setEmail('email@example.com');
      }
    };

    fetchUsers();
  }, []);

  const handlePopupConfirm = async () => {
    setShowPopup(false);
    try {
      if (popupAction === 'logout') {
        await logout();
        router.replace('/LoginPage');
      } else if (popupAction === 'delete') {
        if (!userId) {
          toastContext?.showToast('User ID not found.', 'error');
          return;
        }
        await deleteUser(userId);
        router.replace('/LoginPage');
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error || 'Something went wrong. Please try again.';
      toastContext?.showToast(errorMessage, 'error');
    }
  };

  const openPopup = (type: 'logout' | 'delete') => {
    setPopupAction(type);
    setShowPopup(true);
  };

  const handleDeveloping = () => {
    toastContext?.showToast('This feature is in development', 'success');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/Sravan.jpg')}
            style={styles.profile}
          />
          <View style={{ width: '100%', paddingHorizontal: 30, marginTop: 10 }}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={handleDeveloping}>
              <Image
                source={require('@/assets/images/edit.png')}
                style={styles.editIcon}
              />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsList}>
          {[
            {
              label: 'Change Password',
              icon: require('@/assets/images/password.png'),
              onPress: handleDeveloping,
            },
            {
              label: 'Push Notifications',
              icon: require('@/assets/images/notification.png'),
              toggle: true,
            },
            {
              label: 'Privacy Policy',
              icon: require('@/assets/images/privacyPolicy.png'),
              onPress: () => router.push('/settingsPages/PrivacyPolicy'),
            },
            {
              label: 'Terms Of Use',
              icon: require('@/assets/images/terms.png'),
              onPress: () => router.push('/settingsPages/Terms'),
            },
            {
              label: 'About Us',
              icon: require('@/assets/images/aboutUs.png'),
              onPress: () => router.push('/settingsPages/AboutUs'),
            },
            {
              label: 'Delete Account',
              icon: require('@/assets/images/delete.png'),
              danger: true,
              onPress: () => openPopup('delete'),
            },
            {
              label: 'Log Out',
              icon: require('@/assets/images/logout.png'),
              danger: true,
              onPress: () => openPopup('logout'),
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Image source={item.icon} style={styles.itemIcon} />
              <Text style={[styles.itemLabel, item.danger && { color: 'red' }]}>
                {item.label}
              </Text>
              {item.toggle && (
                <Switch
                  trackColor={{ false: '#ccc', true: Colors.PRIMARY }}
                  thumbColor="#fff"
                  value={true}
                  onValueChange={handleDeveloping}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {showPopup && popupAction && (
        <NotifyPopup
          visible={showPopup}
          title={popupAction === 'logout' ? 'Log Out' : 'Delete Account'}
          message={`Are you sure you want to ${
            popupAction === 'logout' ? 'log out' : 'delete your account'
          }?`}
          onCancel={() => setShowPopup(false)}
          onConfirm={handlePopupConfirm}
          confirmColor={popupAction === 'logout' ? '#007AFF' : 'red'}
        />
      )}

      <FloatingNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    position: 'relative',
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003366',
    marginTop: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  editBtn: {
    marginTop: 12,
    marginLeft: 100,
    backgroundColor: '#003366',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  editIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#fff',
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  settingsList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  itemIcon: {
    width: 45,
    height: 45,
    marginRight: 16,
    resizeMode: 'contain',
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
