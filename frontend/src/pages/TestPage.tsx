import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

function TestPage() {
  useEffect(() => {
    async function fetchPlayers() {
      const { data, error } =
        await supabase
          .from('players')
          .select('*')

      console.log(data)
      console.log(error)
    }

    fetchPlayers()
  }, [])

  return (
    <div className="p-10 text-white">
      Check console
    </div>
  )
}

export default TestPage