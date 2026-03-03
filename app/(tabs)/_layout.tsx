import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f3b41b', // Amarelo Digital Net
        tabBarInactiveTintColor: '#ffffff', // Ícones inativos em branco para contraste
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#091e56', // Azul Escuro Digital Net
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: 'Minha Conta',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cidades"
        options={{
          title: 'Cidades',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          href: null, 
        }}
      />

      <Tabs.Screen
        name="planos"
        options={{
          title: 'Planos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          href: null, 
        }}
      />

      <Tabs.Screen
        name="logado/inicio"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          href: null, 
        }}
      />
      

      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
          href: null, 
        }}
      />
      
    </Tabs>
  );
}