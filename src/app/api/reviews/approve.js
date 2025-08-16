import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { reviewId, status } = await request.json();

    if (!reviewId || !status) {
      return NextResponse.json(
        { error: 'reviewId et status requis' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status doit être approved ou rejected' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', reviewId)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Avis non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: `Avis ${status === 'approved' ? 'approuvé' : 'rejeté'} avec succès`,
      data: data[0] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
