import { createClient } from '@supabase/supabase-js'
import {ReactsupabaseUrl, ReactsupabaseAnonKey} from '../.env';

const supabaseUrl = ReactsupabaseUrl
const supabaseAnonKey = ReactsupabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)