import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ToastContext, ToastContextType } from './ToastManager';
import { getAllUsers } from '@/server/auth';

export default function TopNav() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const toastContext = useContext<ToastContextType | undefined>(ToastContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        if (users && users.length > 0) {
          setUserName(users[0].name);
        } else {
          setUserName('Guest');
        }
      } catch (error) {
        console.error('Error Fetching user:', error);
        setUserName('Guest');
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('@/assets/images/Sravan.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require('@/assets/images/bell.png')}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  greeting: {
    fontFamily: 'Rubik',
    fontSize: 12,
    color: '#000000',
  },
  userName: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    color: '#4A4A4A',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});
