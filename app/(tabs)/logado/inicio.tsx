import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Platform,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "../../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Componentes do projeto
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { width } = Dimensions.get('window');
type IoniconsName = keyof typeof Ionicons.glyphMap;

export default function InicioScreen() {
    const [userName, setUserName] = useState('Cliente');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    // ATUALIZADO: Busca na coleção 'clientes'
                    const userDoc = await getDoc(doc(db, "clientes", user.uid));
                    
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        // Exibe o nome cadastrado. Se não existir, tenta o e-mail formatado.
                        const displayTitle = data.nome || user.email?.split('@')[0] || 'Cliente';
                        setUserName(displayTitle);
                    } else {
                        // Caso o documento não exista no Firestore, usa o e-mail do Auth
                        setUserName(user.email?.split('@')[0] || 'Cliente');
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <ThemedView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ParallaxScrollView
                headerBackgroundColor={{ light: '#D1E8FF', dark: '#ffffff' }}
                headerImage={
                    <View style={styles.headerContent}>
                        <Image
                            source={require('@/assets/images/NovaLogo.png')}
                            style={styles.logo}
                            contentFit="contain"
                        />
                        <ThemedText style={styles.brandName}>DigitalNet</ThemedText>
                        <ThemedText style={styles.brandSubtitle}>Central do Assinante</ThemedText>
                    </View>
                }>

                {/* Seção Hero - Identidade Visual igual ao Login/Home */}
                <ThemedView style={styles.heroSection}>
                    <View style={styles.modernHeaderIndicator} />
                    
                    <View style={styles.welcomeRow}>
                        <View>
                            <ThemedText style={styles.welcomeText}>Bem-vindo de volta,</ThemedText>
                            {loading ? (
                                <ActivityIndicator size="small" color="#f3b41b" style={{ alignSelf: 'flex-start', marginTop: 5 }} />
                            ) : (
                                <ThemedText style={styles.heroTitle}>{userName}</ThemedText>
                            )}
                        </View>
                        <View style={styles.iconCircleYellow}>
                            <Ionicons name="person" size={20} color="#091e56" />
                        </View>
                    </View>

                    <ThemedText style={styles.descriptionWhite}>
                        Seu plano <ThemedText style={styles.highlightYellow}>FIBRA 500 MEGA</ThemedText> está ativo e operando com alta performance.
                    </ThemedText>

                    {/* Status de Conexão Rápido */}
                    <View style={styles.statusBadge}>
                        <View style={styles.statusIndicator} />
                        <ThemedText style={styles.statusText}>Conexão Estável</ThemedText>
                    </View>
                </ThemedView>

                {/* Grid de Serviços - Estilo FeatureItem da Home */}
                <ThemedView style={styles.featuresContainer}>
                    <ThemedText style={styles.sectionTitle}>Serviços Disponíveis</ThemedText>
                    
                    <View style={styles.featureRow}>
                        <ServiceItem 
                            icon="document-text" 
                            title="Financeiro" 
                            desc="Acesse faturas e 2ª via de boletos." 
                        />
                        <ServiceItem 
                            icon="speedometer" 
                            title="Teste de Velocidade" 
                            desc="Verifique sua conexão em tempo real." 
                        />
                        <ServiceItem 
                            icon="logo-whatsapp" 
                            title="Suporte Técnico" 
                            desc="Fale com nosso time de especialistas." 
                        />
                        <ServiceItem 
                            icon="wifi" 
                            title="Minha Rede" 
                            desc="Altere nome e senha do seu Wi-Fi." 
                        />
                    </View>
                </ThemedView>

                {/* Card de Indicação (Estilo LocationCard) */}
                <ThemedView style={styles.promoCard}>
                    <View style={styles.locationInfo}>
                        <View style={styles.iconBoxYellow}>
                            <Ionicons name="gift" size={20} color="#091e56" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <ThemedText style={styles.promoTitle}>Indique um Amigo</ThemedText>
                            <ThemedText style={styles.promoSubtitle}>Ganhe descontos na mensalidade.</ThemedText>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7}>
                        <ThemedText style={styles.outlineButtonText}>Indicar</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.footer}>
                    <ThemedText style={styles.footerText}>DIGITAL NET - Todos os direitos reservados © 2026</ThemedText>
                </ThemedView>

            </ParallaxScrollView>
        </ThemedView>
    );
}

function ServiceItem({ icon, title, desc }: { icon: IoniconsName, title: string, desc: string }) {
    return (
        <TouchableOpacity style={styles.featureItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={24} color="#f3b41b" />
            </View>
            <View style={{ flex: 1 }}>
                <ThemedText style={styles.featureTitle}>{title}</ThemedText>
                <ThemedText style={styles.featureDesc}>{desc}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    logo: {
        width: 140,
        height: 60,
        marginBottom: 8,
    },
    brandName: {
        color: '#091e56',
        fontSize: 24,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
    },
    brandSubtitle: {
        color: '#091e56',
        fontSize: 14,
        fontFamily: 'Poppins',
        textAlign: 'center',
        opacity: 0.7,
    },
    heroSection: {
        backgroundColor: '#091e56',
        padding: 24,
        borderRadius: 28,
        marginTop: -30,
        marginHorizontal: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    modernHeaderIndicator: {
        width: 35,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20,
    },
    welcomeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    welcomeText: {
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Poppins',
        fontSize: 14,
    },
    heroTitle: {
        color: '#f3b41b',
        fontFamily: 'PoppinsBold',
        fontSize: 24,
    },
    descriptionWhite: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 15,
    },
    highlightYellow: {
        color: '#f3b41b',
        fontFamily: 'PoppinsBold',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 8,
    },
    statusText: {
        color: '#4CAF50',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 11,
        textTransform: 'uppercase',
    },
    featuresContainer: {
        marginTop: 25,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontFamily: 'PoppinsBold',
        color: '#091e56',
        marginBottom: 16,
        fontSize: 18,
    },
    featureRow: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 3 },
        }),
    },
    iconBox: {
        backgroundColor: '#091e56',
        padding: 10,
        borderRadius: 14,
    },
    featureTitle: {
        color: '#091e56',
        fontSize: 16,
        fontFamily: 'PoppinsSemiBold',
    },
    featureDesc: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Poppins',
        marginTop: 2,
    },
    promoCard: {
        backgroundColor: '#091e56',
        marginVertical: 25,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    iconBoxYellow: {
        backgroundColor: '#f3b41b',
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoTitle: {
        color: '#fff',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 15,
    },
    promoSubtitle: {
        color: '#ccc',
        fontFamily: 'Poppins',
        fontSize: 12,
    },
    iconCircleYellow: {
        backgroundColor: '#f3b41b',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: '#f3b41b',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    outlineButtonText: {
        color: '#f3b41b',
        fontSize: 12,
        fontFamily: 'PoppinsBold',
    },
    footer: {
        paddingVertical: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#999',
        fontFamily: 'Poppins',
    },
});