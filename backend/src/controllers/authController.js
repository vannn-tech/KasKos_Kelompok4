const supabase = require('../config/supabase');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            return res.status(401).json({ status: 'error', message: 'Email tidak ditemukan!' });
        }

        if (data.password !== password) {
            return res.status(401).json({ status: 'error', message: 'Password salah!' });
        }

        res.status(200).json({ status: 'success', message: 'Login berhasil', user: data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const register = async (req, res) => {
    const { nama_lengkap, email, password, no_telepon, role } = req.body;

    try {
        const { data: existingUser } = await supabase.from('users').select('email').eq('email', email).single();
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email sudah digunakan!' });
        }

        const { data, error } = await supabase
            .from('users')
            .insert([{ nama_lengkap, email, password, no_telepon, role }])
            .select();

        if (error) throw error;

        res.status(201).json({ status: 'success', message: 'Registrasi berhasil', user: data[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { login, register };
