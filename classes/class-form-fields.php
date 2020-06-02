<?php
/**
 * class-form-fields.php
 */

if ( ! class_exists( 'Form_Fields' ) ) {

	/**
	 * Form_Fields
	 * 
	 * An object for holding fields of a form.
	 * 
	 * @since	1.0
	 * @author	control
	 * @package Fields
	 */
	class Form_Fields {

		/**
		 * Create an array to store
		 * all the entry values in.
		 */
		private $entries = array();

		/**
		 * Returns the collecion of all entries
		 * 
		 * @return  array
		 */
		public function get_entries() {
			return $this->entries;
		}

		/**
		 * Returns the selected field
		 * 
		 * @param   string $field
		 * @return  any
		 */
		public function get( $field ) {
			if ( isset( $this->entries[ $field ] ) )
				return $this->entries[ $field ];
			return false;
		}

		/**
		 * Add key and value 
		 * to instance.
		 * 
		 * @param   string $field
		 * @param   any $value
		 * @return  this
		 */
		public function set( $field, $value ) {
			$this->entries[ $field ] = $value ;
			return $this;
		}

		/**
		 * Remove key and value 
		 * from instance.
		 * 
		 * @param   string $field
		 * @return  this
		 */
		public function remove( $field ) {
			foreach ( $this->entries as $key => $value ) {
				if ( $key === $field ) unset( $this->entries[ $key ] );
			}
			return $this;
		}

		/**
		 * Returns an array with only 
		 * the keys.
		 * 
		 * @return  array
		 */
		public function keys() {
			$keys = array();
			foreach ( $this->entries as $key => $value ) {
				array_push( $keys, $key );
			}
			return $keys;
		}

		/**
		 * Returns an array with only 
		 * the values.
		 * 
		 * @return  array
		 */
		public function values() {
			$values = array();
			foreach ( $this->entries as $key => $value ) {
				array_push( $values, $value );
			}
			return $values;
		}

		/**
		 * Magic function to check
		 * if a property isset
		 * 
		 * @param   string $name
		 * @return  boolean
		 */
		public function __isset( $name ) {
			return isset( $this->entries[ $name ] );
		}

		/**
		 * Converts the entries to
		 * a queryiable string
		 * 
		 * @return  string
		 */
		public function __toString() {
			$query = array();
			foreach ( $this->entries as $key => $value ) {
				array_push( $query, "{$key}={$value}" );
			}
			return '?' + implode( '&', $query );
		}

	}

}