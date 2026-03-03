import React from 'react';
import { StyleSheet, ScrollView, View, Platform, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { width } = Dimensions.get('window');

export default function PlanosScreen() {
    const router = useRouter();

    const planos = [
        {
            mega: '200',
            preco: '89,90',
            fibra: true,
            wifi: 'Dual Band',
            destaque: false,
        },
        {
            mega: '400',
            preco: '109,90',
            fibra: true,
            wifi: 'Premium',
            destaque: true, 
        },
        {
            mega: '600',
            preco: '139,90',
            fibra: true,
            wifi: 'Ultra Gigante',
            destaque: false,
        }
    ];

    return (
        <ThemedView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#091e56" translucent />
            
            {/* Cabeçalho */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#f3b41b" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Nossos Planos</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Ultravelocidade que conecta você ao mundo</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {planos.map((plano, index) => (
                    <View 
                        key={index} 
                        style={[styles.planoCard, plano.destaque && styles.planoDestaqueBorder]}
                    >
                        {plano.destaque && (
                            <View style={styles.badgeDestaque}>
                                <ThemedText style={styles.badgeText}>MAIS VENDIDO</ThemedText>
                            </View>
                        )}

                        <View style={styles.planoHeader}>
                            <View>
                                <ThemedText style={styles.megaText}>
                                    {plano.mega}
                                    <ThemedText style={styles.megaUnit}>MEGA</ThemedText>
                                </ThemedText>
                                <ThemedText style={styles.fibraText}>
                                    100% FIBRA ÓPTICA
                                </ThemedText>
                            </View>
                            <Ionicons name="flash" size={40} color="#f3b41b" />
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.featuresList}>
                            <FeatureItem icon="wifi" text={`Wi-Fi ${plano.wifi}`} />
                            <FeatureItem icon="infinite" text="Download ilimitado" />
                            <FeatureItem icon="checkmark-circle" text="Suporte Prioritário" />
                        </View>

                        <View style={styles.priceContainer}>
                            <View>
                                <ThemedText style={styles.priceLabel}>Por apenas</ThemedText>
                                <ThemedText style={styles.priceValue}>
                                    R$ <ThemedText style={styles.priceBig}>{plano.preco.split(',')[0]}</ThemedText>,{plano.preco.split(',')[1]}
                                    <ThemedText style={styles.perMonth}>/mês</ThemedText>
                                </ThemedText>
                            </View>

                            <TouchableOpacity 
                                style={styles.contractButton}
                                activeOpacity={0.8}
                            >
                                <ThemedText style={styles.contractButtonText}>ASSINAR</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

function FeatureItem({ icon, text }: { icon: any, text: string }) {
    return (
        <View style={styles.featureRow}>
            <Ionicons name={icon} size={18} color="#f3b41b" />
            <ThemedText style={styles.featureText}>{text}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7FA' },
    header: {
        backgroundColor: '#091e56',
        paddingTop: Platform.OS === 'ios' ? 60 : 50,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: { marginBottom: 15 },
    headerTitle: { color: '#f3b41b', fontSize: 26, fontFamily: 'PoppinsBold' },
    headerSubtitle: { color: '#FFFFFF', fontSize: 14, fontFamily: 'Poppins', opacity: 0.8 },
    scrollContent: { padding: 20, paddingTop: 10 },
    planoCard: {
        backgroundColor: '#091e56', // Todos os cards agora são Azuis
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    planoDestaqueBorder: {
        borderColor: '#f3b41b',
        borderWidth: 2,
        transform: [{ scale: 1.02 }],
    },
    badgeDestaque: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#f3b41b',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        zIndex: 10,
    },
    badgeText: { color: '#091e56', fontFamily: 'PoppinsBold', fontSize: 10 },
    planoHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingVertical: 5,
    },
    megaText: { 
        fontSize: 34, 
        fontFamily: 'PoppinsBlack', 
        color: '#FFFFFF', // Texto em Branco para fundo azul
        lineHeight: 38,
    },
    megaUnit: { 
        fontSize: 14, 
        fontFamily: 'PoppinsBold',
        marginLeft: 2, 
        color: '#f3b41b', // MEGA em Amarelo
    },
    fibraText: { 
        fontSize: 12, 
        fontFamily: 'PoppinsBold', 
        color: '#f3b41b', 
        marginTop: -5 
    },
    divider: { 
        height: 1, 
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Divisória suave
        marginVertical: 20, 
    },
    featuresList: { marginBottom: 10 },
    featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    featureText: { fontSize: 14, fontFamily: 'Poppins', color: '#FFFFFF' },
    priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 },
    priceLabel: { fontSize: 12, fontFamily: 'Poppins', color: 'rgba(255, 255, 255, 0.7)' },
    priceValue: { fontSize: 18, fontFamily: 'PoppinsBold', color: '#FFFFFF' },
    priceBig: { fontSize: 32, fontFamily: 'PoppinsBlack', color: '#f3b41b' },
    perMonth: { fontSize: 12, fontFamily: 'Poppins', color: '#FFFFFF' },
    contractButton: {
        backgroundColor: '#f3b41b', // Botão agora Amarelo para contrastar com o Azul
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 15,
    },
    contractButtonText: { color: '#091e56', fontFamily: 'PoppinsBold', fontSize: 14 },
});