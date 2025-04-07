import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ name, color, badge }: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; badge?: number }) {
    return (
        <View style={styles.iconWrapper}>
            <FontAwesome size={26} name={name} color={color} />
            {badge && badge > 0 && (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
        </View>
    );
}

export default function TabLayout() {
    const inProgressCount = useSelector((state: RootState) => state.tasks.inProgressCount);

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#007aff', tabBarInactiveTintColor: '#8e8e93', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Головна',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'Список',
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} badge={inProgressCount} />
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Створити',
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    badgeContainer: {
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: '#ff3b30',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
});
