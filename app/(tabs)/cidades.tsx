import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Platform, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CidadesScreen() {
    const router = useRouter();
    const [expandedCity, setExpandedCity] = useState<string | null>(null);

    const unidades = [
        {
            estado: 'Espírito Santo',
            sigla: 'ES',
            dados: [
                { nome: 'Alegre', tel: '2835520000' },
                { nome: 'Guaçuí', tel: '2835530000' },
                { nome: 'Muniz Freire', tel: '2835440000' },
                { nome: 'Castelo', tel: '2835420000' },
                { nome: 'Jerônimo Monteiro', tel: '2835580000' }
            ]
        },
        {
            estado: 'Rio de Janeiro',
            sigla: 'RJ',
            dados: [
                { nome: 'Natividade', tel: '2238410000' },
                { nome: 'Porciúncula', tel: '2238420000' }
            ]
        }
    ];

    const toggleExpand = (cityName: string) => {
        setExpandedCity(expandedCity === cityName ? null : cityName);
    };

    const handleCall = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <ThemedView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#091e56" translucent />
            
            <View style={styles.header}>
                <ThemedText style={styles.headerTitle}>Cidades Atendidas</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Toque na cidade para ver o contato</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {unidades.map((item, index) => (
                    <View key={index} style={styles.stateSection}>
                        <View style={styles.stateHeader}>
                            <Ionicons name="location" size={20} color="#f3b41b" />
                            <ThemedText style={styles.stateTitle}>{item.estado}</ThemedText>
                        </View>

                        <View style={styles.citiesGrid}>
                            {item.dados.map((cidade, cIndex) => {
                                const isExpanded = expandedCity === cidade.nome;
                                
                                return (
                                    <View key={cIndex} style={[styles.cityCardContainer, isExpanded && styles.cardExpanded]}>
                                        <TouchableOpacity 
                                            style={styles.cityCardHeader} 
                                            onPress={() => toggleExpand(cidade.nome)}
                                            activeOpacity={0.6} // Ajustado para não clarear demais
                                        >
                                            <View style={styles.cityIndicator} />
                                            <ThemedText style={styles.cityName}>{cidade.nome}</ThemedText>
                                            <Ionicons 
                                                name={isExpanded ? "chevron-up" : "chevron-down"} 
                                                size={20} 
                                                color="#091e56" 
                                            />
                                        </TouchableOpacity>

                                        {isExpanded && (
                                            <View style={styles.expandableContent}>
                                                <View style={styles.divider} />
                                                <View style={styles.contactRow}>
                                                    <View>
                                                        <ThemedText style={styles.contactLabel}>Telefone de Contato:</ThemedText>
                                                        <ThemedText style={styles.phoneNumber}>{cidade.tel}</ThemedText>
                                                    </View>
                                                    
                                                    {/* Botão Corrigido para não "ficar branco" */}
                                                    <TouchableOpacity 
                                                        style={styles.callButton}
                                                        onPress={() => handleCall(cidade.tel)}
                                                        activeOpacity={0.8} // Mantém a cor sólida ao clicar
                                                    >
                                                        <Ionicons name="call" size={20} color="#091e56" />
                                                        <ThemedText style={styles.callButtonText}>Ligar</ThemedText>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}

                <View style={styles.contactInfo}>
                    <ThemedText style={styles.contactText}>Não encontrou sua cidade?</ThemedText>
                    <ThemedText style={styles.contactSubtext}>Estamos em constante expansão!</ThemedText>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7FA',
    },
    header: {
        backgroundColor: '#091e56',
        paddingTop: Platform.OS === 'ios' ? 60 : 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: '#f3b41b',
        fontSize: 24,
        fontFamily: 'PoppinsBold',
    },
    headerSubtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Poppins',
        opacity: 0.8,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    stateSection: {
        marginBottom: 30,
    },
    stateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 8,
    },
    stateTitle: {
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        color: '#091e56',
    },
    citiesGrid: {
        gap: 12,
    },
    cityCardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E6EBF5',
    },
    cardExpanded: {
        borderColor: '#f3b41b',
        borderWidth: 1.5,
    },
    cityCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    cityIndicator: {
        width: 4,
        height: 20,
        backgroundColor: '#f3b41b',
        borderRadius: 2,
        marginRight: 12,
    },
    cityName: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'PoppinsSemiBold',
        color: '#333',
    },
    expandableContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#FCFDFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#E6EBF5',
        marginBottom: 12,
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactLabel: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#666',
    },
    phoneNumber: {
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        color: '#091e56',
    },
    callButton: {
        backgroundColor: '#f3b41b', // Cor Amarela Digital Net
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
        // Garantindo que não haja transparência de fundo
        borderWidth: 0,
    },
    callButtonText: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
        color: '#091e56',
    },
    contactInfo: {
        marginTop: 10,
        alignItems: 'center',
    },
    contactText: {
        fontFamily: 'PoppinsSemiBold',
        color: '#091e56',
        fontSize: 14,
    },
    contactSubtext: {
        fontFamily: 'Poppins',
        color: '#666',
        fontSize: 12,
    },
});