// resources/js/hooks/useStudySessions.js
 
import { useState, useEffect } from 'react';
 
/**
 * Hook för att hämta studiesessioner från API:et.
 *
 * Användning:
 *   const { sessions, pagination, loading, error, fetchPage } = useStudySessions();
 *   const { sessions } = useStudySessions({ subject: 'Matte', perPage: 5 });
 */
export function useStudySessions({ subject = null, perPage = 15 } = {}) {
    const [sessions, setSessions]     = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading]       = useState(false);
    const [error, setError]           = useState(null);
 
    const fetchPage = async (page = 1) => {
        setLoading(true);
        setError(null);
 
        try {
            const params = new URLSearchParams({ per_page: perPage, page });
            if (subject) params.append('subject', subject);
 
            const res = await fetch(`/api/sessions?${params}`);
 
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
 
            const json = await res.json();
            setSessions(json.data);
            setPagination(json.pagination);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
 
    // Hämta sida 1 direkt när hooken mountas eller filter ändras
    useEffect(() => {
        fetchPage(1);
    }, [subject, perPage]);
 
    return { sessions, pagination, loading, error, fetchPage };
}
 