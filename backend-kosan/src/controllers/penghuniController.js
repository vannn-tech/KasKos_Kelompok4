const supabase = require('../config/supabase');

const getPenghuni = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('penghuni')
            .select(`
                id,
                tanggal_masuk,
                status_aktif,
                users ( nama_lengkap, email, no_telepon ),
                kamar ( nomor_kamar )
            `)
            .order('tanggal_masuk', { ascending: false });

        if (error) throw error;
        res.status(200).json({ status: 'success', data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const registerPenghuni = async (req, res) => {
    const { nama_lengkap, email, password, no_telepon, kamar_id } = req.body;

    try {
        const { data: checkEmail } = await supabase.from('users').select('email').eq('email', email).single();
        if (checkEmail) return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar!' });

        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([{ nama_lengkap, email, password, role: 'Penghuni', no_telepon }])
            .select()
            .single();

        if (userError) throw userError;

        const { error: penghuniError } = await supabase
            .from('penghuni')
            .insert([{
                user_id: userData.id,
                kamar_id: kamar_id,
                tanggal_masuk: new Date().toISOString().split('T')[0],
                status_aktif: true
            }]);

        if (penghuniError) throw penghuniError;

        const { error: updateKamarError } = await supabase
            .from('kamar')
            .update({ status_kamar: 'Terisi' })
            .eq('id', kamar_id);

        if (updateKamarError) throw updateKamarError;

        res.status(201).json({ status: 'success', message: 'Penghuni berhasil didaftarkan dan kamar otomatis terisi!' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { getPenghuni, registerPenghuni };
