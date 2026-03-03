import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db, auth } from "../../services/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Componentes do projeto
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SweetModal } from '@/components/SweetModal';

export default function CadastroScreen() {
    const router = useRouter();

    // Estados do Formulário
    const [secureText, setSecureText] = useState(true);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Estado do Modal
    const [modalConfig, setModalConfig] = useState({
        visible: false,
        type: 'warning' as 'success' | 'error' | 'warning',
        title: '',
        message: ''
    });

    const showAlert = (type: 'success' | 'error' | 'warning', title: string, message: string) => {
        setModalConfig({ visible: true, type, title, message });
    };

    const handleCadastro = async () => {
        // Validações básicas
        if (!nome.trim() || !email.trim() || !password || !confirmPassword) {
            showAlert('warning', 'Atenção', 'Todos os campos são obrigatórios.');
            return;
        }

        if (password.length < 6) {
            showAlert('warning', 'Senha Curta', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('warning', 'Erro nas senhas', 'As senhas digitadas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            // 1. Criar usuário no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;

            // 2. Salvar dados na coleção "clientes"
            await setDoc(doc(db, "clientes", user.uid), {
                nome: nome.trim(),
                email: email.trim(),
                uid: user.uid,
                criado_em: serverTimestamp(),
                status: "ativo",
                plataforma: Platform.OS,
                tipo_usuario: "cliente"
            });

            showAlert('success', 'Sucesso!', 'Sua conta foi criada com sucesso.');
            
            // Pequeno delay para o usuário ver o sucesso antes de redirecionar
            setTimeout(() => {
                setModalConfig(prev => ({ ...prev, visible: false }));
                router.replace("/(tabs)/logado/inicio");
            }, 2000);

        } catch (error: any) {
            let errorMessage = "Não foi possível realizar o cadastro.";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este e-mail já está em uso por outra conta.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "O e-email digitado é inválido.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "A senha escolhida é muito fraca.";
            }

            showAlert('error', 'Erro no Cadastro', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

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
                        </View>
                    }>

                    <ThemedView style={styles.heroSection}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#f3b41b" />
                            <ThemedText style={styles.backText}>Voltar</ThemedText>
                        </TouchableOpacity>

                        <ThemedText style={styles.heroTitle}>Crie sua conta</ThemedText>
                        <ThemedText style={styles.descriptionWhite}>
                            Preencha os dados abaixo para se tornar um cliente <ThemedText style={styles.highlightYellow}>DIGITAL NET</ThemedText>.
                        </ThemedText>

                        <View style={styles.modernForm}>
                            {/* Campo Nome */}
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>Nome Completo</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="person-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Seu nome aqui"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        style={styles.modernInput}
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>
                            </View>

                            {/* Campo E-mail */}
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>E-mail</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="mail-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="exemplo@email.com"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        style={styles.modernInput}
                                        keyboardType="email-address"
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            {/* Campo Senha */}
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>Senha</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="lock-closed-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Mínimo 6 caracteres"
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

                            {/* Confirmar Senha */}
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.labelWhite}>Confirmar Senha</ThemedText>
                                <View style={styles.modernInputWrapper}>
                                    <Ionicons name="checkmark-circle-outline" size={20} color="#f3b41b" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Repita sua senha"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        style={styles.modernInput}
                                        secureTextEntry={secureText}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.heroButton, loading && { opacity: 0.7 }]}
                                onPress={handleCadastro}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#091e56" /> : (
                                    <>
                                        <ThemedText style={styles.heroButtonText}>FINALIZAR CADASTRO</ThemedText>
                                        <Ionicons name="checkmark-done" size={18} color="#091e56" />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ThemedView>

                    <View style={{ height: 40 }} />
                </ParallaxScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
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
        marginBottom: 5,
    },
    brandName: {
        color: '#091e56',
        fontSize: 22,
        fontFamily: 'PoppinsBlack',
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 5
    },
    backText: {
        color: '#f3b41b',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14
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
    heroButton: {
        backgroundColor: '#f3b41b',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
        gap: 10,
        elevation: 4,
    },
    heroButtonText: {
        color: '#091e56',
        fontFamily: 'PoppinsBold',
        fontSize: 15,
    },
});