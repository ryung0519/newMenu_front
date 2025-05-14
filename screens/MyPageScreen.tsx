import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {getStoredUserData} from '../services/auth';
import {UserData} from '../types/UserData';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userData, setUserData] = useState<UserData | null>(null);
  const {user, logout} = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        const data = await getStoredUserData();
        setUserData(data);
      };
      loadUserData();
    }, []),
  );

  const requireLogin = (targetScreen: keyof RootStackParamList) => {
    if (!user) {
      Alert.alert('로그인이 필요합니다.', '', [
        {
          text: '로그인',
          onPress: () => navigation.navigate('Login'),
        },
        {text: '취소', style: 'cancel'},
      ]);
    } else {
      navigation.navigate(targetScreen);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            logout();
            navigation.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>내 프로필</Text>
        <View style={styles.separator} />
        {userData ? (
          <>
            <Text style={styles.userName}>{userData.userName}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </>
        ) : (
          <>
            <Text style={styles.userName}>게스트</Text>
            <Text style={styles.email}>로그인이 필요합니다</Text>
          </>
        )}

        <View style={styles.separator} />
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => requireLogin('SubscribedBrandList')}>
            <MaterialIcons name="favorite" size={30} color="#3366ff" />
            <Text style={styles.iconLabel}>MY 찜</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => requireLogin('MyReviewList')}>
            <MaterialIcons name="rate-review" size={30} color="#3366ff" />
            <Text style={styles.iconLabel}>내 리뷰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => requireLogin('Main')}>
            <MaterialCommunityIcons
              name="bell-ring"
              size={30}
              color="#3366ff"
            />
            <Text style={styles.iconLabel}>알림</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {userData && (
          <>
            <Text style={styles.sectionTitle}>🍽️ 좋아하는 음식</Text>
            <Text style={styles.infoText}>{userData.preferredFood}</Text>

            <Text style={styles.sectionTitle}>🚫 알레르기 음식</Text>
            <Text style={styles.infoText}>{userData.allergicFood}</Text>
          </>
        )}

        <View style={{height: 100}} />
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={styles.buttonGroup}>
        {user ? (
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={styles.actionButtonText}>로그아웃</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.actionButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
        {user && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('UserEdit')}>
            <Text style={styles.actionButtonText}>내정보 수정</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#222',
    marginTop: 6,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#333',
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#3366ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyPage;
