import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';

// Tipagem para os ícones do Ionicons
type IoniconsName = keyof typeof Ionicons.glyphMap;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

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
            <View style={{ height: 10 }} />
            <ThemedText style={styles.brandSubtitle}>A sua internet banda larga</ThemedText>
            <ThemedText style={styles.brandTagline}>Infraestrutura de Alta Performance</ThemedText>
          </View>
        }>

        {/* Seção Hero */}
        <ThemedView style={styles.heroSection}>
          <ThemedText style={styles.heroTitle}>Nossa Conexão</ThemedText>
          <ThemedText style={styles.descriptionWhite}>
            A <ThemedText style={styles.highlightYellow}>DIGITAL NET</ThemedText> utiliza tecnologia de fibra óptica de última geração para garantir estabilidade e ultravelocidade. Somos o elo entre você e o mundo digital.
          </ThemedText>

          {/* BOTÃO ATUALIZADO: Conheça nossos Planos */}
          <TouchableOpacity 
            style={styles.heroButton} 
            activeOpacity={0.7}
            onPress={() => router.push('/planos')}
          >
            <ThemedText style={styles.heroButtonText}>Conheça nossos Planos</ThemedText>
            <Ionicons name="arrow-forward" size={16} color="#091e56" />
          </TouchableOpacity>
        </ThemedView>

        {/* Lista de Features */}
        <ThemedView style={styles.featuresContainer}>
          <ThemedText style={styles.sectionTitle}>O que este APP oferece:</ThemedText>

          <View style={styles.featureRow}>
            <FeatureItem icon="swap-horizontal" title="Intermediação Direta" desc="Resolva pendências e solicitações sem filas." />
            <FeatureItem icon="wifi" title="Gestão de Rede" desc="Acompanhe o status técnico da sua fibra." />
            <FeatureItem icon="shield-checkmark" title="Segurança" desc="Dados e contratos protegidos." />
            <FeatureItem icon="flash" title="Auto-Atendimento" desc="Suporte técnico inteligente." />
          </View>
        </ThemedView>

        {/* Card de Localização */}
        <ThemedView style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <View style={styles.iconCircleYellow}>
              <Ionicons name="location" size={20} color="#091e56" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.locationTitle}>Atendimentos</ThemedText>
              <ThemedText style={styles.locationSubtitle}>Consulte nossa área de atendimentos.</ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push('/cidades')}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.outlineButtonText}>Ver Cidades</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.footer}>
           <ThemedText style={styles.footerText}>DIGITAL NET - Todos os direitos reservados © 2026</ThemedText>
        </ThemedView>

      </ParallaxScrollView>
    </ThemedView>
  );
}

function FeatureItem({ icon, title, desc }: { icon: IoniconsName, title: string, desc: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={24} color="#f3b41b" />
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.featureTitle}>{title}</ThemedText>
        <ThemedText style={styles.featureDesc}>{desc}</ThemedText>
      </View>
    </View>
  );
}

// ... (seus estilos permanecem exatamente os mesmos)
const styles = StyleSheet.create({
  headerContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 160,
    height: 70,
    marginBottom: 10,
  },
  brandName: {
    color: '#091e56',
    fontSize: 28,
    fontFamily: 'PoppinsBlack',
    textAlign: 'center',
  },
  brandSubtitle: {
    color: '#091e56',
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center',
  },
  brandTagline: {
    color: '#091e56',
    fontSize: 10,
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    marginTop: 8,
    letterSpacing: 1,
    opacity: 0.8,
  },
  heroSection: {
    backgroundColor: '#091e56',
    padding: 24,
    borderRadius: 24,
    marginTop: -30,
    marginHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  heroTitle: {
    color: '#f3b41b',
    fontFamily: 'PoppinsBold',
    fontSize: 22,
    marginBottom: 8,
  },
  descriptionWhite: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 24,
  },
  highlightYellow: {
    color: '#f3b41b',
    fontFamily: 'PoppinsBold',
  },
  heroButton: {
    backgroundColor: '#f3b41b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  heroButtonText: {
    color: '#091e56',
    fontFamily: 'PoppinsBold',
    fontSize: 15,
  },
  featuresContainer: {
    marginTop: 30,
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
    borderRadius: 18,
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
    fontSize: 13,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  locationCard: {
    backgroundColor: '#091e56',
    marginVertical: 32,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 20,
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
  locationTitle: {
    color: '#fff',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
  },
  locationSubtitle: {
    color: '#ccc',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  iconCircleYellow: {
    backgroundColor: '#f3b41b',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#f3b41b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  outlineButtonText: {
    color: '#f3b41b',
    fontSize: 12,
    fontFamily: 'PoppinsBold',
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Poppins',
  },
});