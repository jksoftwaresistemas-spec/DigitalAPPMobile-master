import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db, auth } from "../../services/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// Componentes do projeto
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SweetModal } from '@/components/SweetModal'; // Certifique-se que o arquivo existe

export default function LoginScreen() {
    const router = useRouter();

    // Estados do Formulário
    const [secureText, setSecureText] = useState(true);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Estado do Modal (SweetAlert Style)
    const [modalConfig, setModalConfig] = useState({
        visible: false,
        type: 'warning' as 'success' | 'error' | 'warning',
        title: '',
        message: ''
    });

    const showAlert = (type: 'success' | 'error' | 'warning', title: string, message: string) => {
        setModalConfig({ visible: true, type, title, message });
    };

    const handleLogin = async () => {
        const cleanIdentifier = identifier.trim();

        if (!cleanIdentifier || !password) {
            showAlert('warning', 'Atenção', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const finalEmail = cleanIdentifier.includes('@')
                ? cleanIdentifier
                : `${cleanIdentifier}@digitalnet.com.br`;

            const userCredential = await signInWithEmailAndPassword(auth, finalEmail, password);
            const user = userCredential.user;

            // Salva na coleção 'clientes' mantendo dados anteriores
            await setDoc(doc(db, "clientes", user.uid), {
                ultimo_acesso: serverTimestamp(),
                status: "online",
                plataforma: Platform.OS
            }, { merge: true });

            router.replace("/(tabs)/logado/inicio");

        } catch (error: any) {
            // DEFINIÇÃO DA VARIÁVEL QUE ESTAVA FALTANDO:
            let errorMessage = "Erro ao tentar entrar.";

            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Usuário ou senha incorretos.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "O formato do e-mail é inválido.";
            }

            showAlert('error', 'Erro no Login', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePagCadastro = () => {
        router.push("/cadastro");
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Modal Customizado estilo SweetAlert */}
            <SweetModal
                visible={modalConfig.visible}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                onClose={() => setModalConfig({ ...modalConfig, visible: false })}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
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

                    <ThemedView style={styles.heroSection}>
                        <ThemedText style={styles.heroTitle}>Acesse sua conta</ThemedText>
                        <ThemedText style={styles.descriptionWhite}>
                            Bem-vindo à <ThemedText style={styles.highlightYellow}>DIGITAL NET</ThemedText>. Insira suas credenciais.
                        </ThemedText>

                        <View style={styles.modernForm}>
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>Identificação</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="person-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="CPF, CNPJ ou E-mail"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        style={styles.modernInput}
                                        keyboardType="email-address"
                                        value={identifier}
                                        onChangeText={setIdentifier}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>Sua Senha</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="lock-closed-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="********"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        style={styles.modernInput}
                                        secureTextEntry={secureText}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                        <Ionicons name={secureText ? "eye-off" : "eye"} size={20} color="#f3b41b" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.heroButton, loading && { opacity: 0.7 }]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#091e56" /> : (
                                    <>
                                        <ThemedText style={styles.heroButtonText}>ENTRAR</ThemedText>
                                        <Ionicons name="arrow-forward" size={18} color="#091e56" />
                                    </>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.heroButton, styles.secondaryButton, loading && { opacity: 0.7 }]}
                                activeOpacity={0.8}
                                onPress={handlePagCadastro}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#091e56" />
                                ) : (
                                    <>
                                        <ThemedText style={styles.heroButtonText}>CADASTRE-SE</ThemedText>
                                        <Ionicons name="person-add-outline" size={18} color="#091e56" />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ThemedView>

                    <ThemedView style={styles.footer}>
                        <ThemedText style={styles.footerText}>DIGITAL NET - Todos os direitos reservados © 2026</ThemedText>
                    </ThemedView>
                </ParallaxScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

// ... (seus estilos permanecem os mesmos abaixo)

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
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 20,
    },
    highlightYellow: {
        color: '#f3b41b',
        fontFamily: 'PoppinsBold',
    },
    modernForm: {
        gap: 16,
    },
    inputGroup: {
        gap: 8,
    },
    labelWhite: {
        color: '#FFFFFF',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 13,
        marginLeft: 4,
    },
    modernInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 12,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 12,
    },
    modernInput: {
        flex: 1,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins',
    },
    modernEyeIcon: {
        padding: 5,
    },
    heroButton: {
        backgroundColor: '#f3b41b', // Cor do botão ENTRAR (Amarelo)
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
        gap: 10,
        elevation: 4,
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF', // Cor do botão CADASTRE-SE (Branco)
        marginTop: 12, // Um pouco mais de espaçamento entre eles
    },
    heroButtonText: {
        color: '#091e56', // Azul escuro mantido para ambos
        fontFamily: 'PoppinsBold',
        fontSize: 15,
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