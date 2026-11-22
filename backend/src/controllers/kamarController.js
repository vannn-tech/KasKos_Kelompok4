const supabase = require('../config/supabase');

const getKamar = async (req, res) => {
    try {
        let query = supabase.from('kamar').select('*').order('nomor_kamar', { ascending: true });
        
        if (req.query.status) {
            query = query.eq('status_kamar', req.query.status);
        }

        const { data, error } = await query;
        if (error) throw error;

        res.status(200).json({ status: 'success', data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const createKamar = async (req, res) => {
    const { nomor_kamar, tarif_bulanan, status_kamar } = req.body;

    try {
        const { data: existingKamar } = await supabase.from('kamar').select('nomor_kamar').eq('nomor_kamar', nomor_kamar).single();
        if (existingKamar) {
            return res.status(400).json({ status: 'error', message: 'Nomor Kamar sudah ada!' });
        }

        const { data, error } = await supabase
            .from('kamar')
            .insert([{ nomor_kamar, tarif_bulanan, status_kamar }])
            .select();
            
        if (error) throw error;
        res.status(201).json({ status: 'success', message: 'Kamar berhasil disimpan', data: data[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const deleteKamar = async (req, res) => {
    try {
        const { error } = await supabase.from('kamar').delete().eq('id', req.params.id);
        if (error) throw error;
        res.status(200).json({ status: 'success', message: 'Kamar dihapus' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { getKamar, createKamar, deleteKamar };
