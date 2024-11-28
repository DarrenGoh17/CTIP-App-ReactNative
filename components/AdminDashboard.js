import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import config from '../backend/config';

const AdminDashboard = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [isEditingMode, setIsEditingMode] = useState(false);  // Toggle between Add/Edit

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/users`);
            setUsers(response.data);
            console.log("User fetching successful.")
        } catch (error) {
            Alert.alert('Error fetching users');
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/signup`, {
                username,
                email,
                phoneNumber,
                password,
            });
            Alert.alert(response.data.message);
            fetchUsers();
            clearForm(); // Clear form after adding
        } catch (error) {
            Alert.alert('Error adding user');
        }
    };

    const handleEditUser = async () => {
        try {
            const response = await axios.put(`${config.API_BASE_URL}/user/${editingUserId}`, {
                username,
                email,
                phoneNumber,
                password,
            });
            Alert.alert(response.data.message);
            fetchUsers();
            clearForm(); // Clear form after editing
            setEditingUserId(null);  // Reset to Add User mode
            setIsEditingMode(false);
        } catch (error) {
            Alert.alert('Error updating user');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${config.API_BASE_URL}/user/${userId}`);
            Alert.alert(response.data.message);
            fetchUsers();
        } catch (error) {
            Alert.alert('Error deleting user');
        }
    };

    const clearForm = () => {
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    };

    const handleMenuChange = (mode) => {
        setIsEditingMode(mode);
        clearForm(); // Clear the form whenever the mode changes
    };

    const handleEditButtonPress = (item) => {
        setUsername(item.username);
        setEmail(item.email);
        setPhoneNumber(item.phone_number);
        setPassword('');
        setEditingUserId(item.id);
        setIsEditingMode(true); // Switch to Edit mode
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={28} color="#2f4f2f" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Admin Dashboard</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity
                    onPress={() => handleMenuChange(false)}
                    style={[styles.menuItem, !isEditingMode && styles.activeMenu]}
                >
                    <Text style={styles.menuText}>Add User</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleMenuChange(true)}
                    style={[styles.menuItem, isEditingMode && styles.activeMenu]}
                >
                    <Text style={styles.menuText}>Edit User</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
                <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
                <TextInput style={styles.input} placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} />
                <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />

                {isEditingMode ? (
                    <Button title="Update User" onPress={handleEditUser} />
                ) : (
                    <Button title="Add User" onPress={handleAddUser} />
                )}
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.usernameText}>{item.username}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleEditButtonPress(item)}>
                                <Icon name="edit" size={20} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteIcon}>
                                <Icon name="delete" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f5e6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2f4f2f',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
    },
    activeMenu: {
        backgroundColor: '#2f4f2f',
    },
    menuText: {
        color: '#fff',
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        width: '100%',
        height: 50,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    usernameText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteIcon: {
        marginLeft: 20,
        marginRight: 10,
    },
});

export default AdminDashboard;
