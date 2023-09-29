import pool from '../utils/db';

export const acrualToken = async (token: string, token2: string) => {

  const result = await pool.query("SELECT * FROM user_token WHERE token = 1$ AND token2 = $2", [token, token2]);
  if (result.rows[0].is_active) {
    const currentDate = new Date().toISOString().split('T')[0];
    const savedDateObj = new Date(result.rows[0].date_active);
    const currentDateObj = new Date(currentDate);

    const timeDiff = Math.abs(currentDateObj.getTime() - savedDateObj.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const weeksDiff = Math.floor(daysDiff / 7);

    if (weeksDiff >= 1) {
      return { isError: true, message: "Время авторизации истекло" }
    } else {
      const updateResult = await pool.query('UPDATE user_token SET date_active = $1 WHERE id=$2', [currentDate, result.rows[0].id]);
    }


  }
  return { isError: true, message: "Время авторизации истекло" }

}
/*


CREATE TABLE IF NOT EXISTS public.user_token
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    date_active date NOT NULL,
    token text COLLATE pg_catalog."default" NOT NULL,
    token2 text COLLATE pg_catalog."default" NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT user_token_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_token
    OWNER to postgres;
 */
